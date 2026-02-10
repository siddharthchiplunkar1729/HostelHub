const http = require('http');

function testFilter(name, query) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3002,
            path: `/api/hostels?${query}`,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const hostels = JSON.parse(data);
                    console.log(`[TEST] ${name}: Found ${hostels.length} hostels.`);
                    resolve(hostels);
                } catch (e) {
                    console.error(`[FAIL] ${name}: Invalid JSON`, data);
                    reject(e);
                }
            });
        });

        req.on('error', (e) => {
            console.error(`[FAIL] ${name}: ${e.message}`);
            reject(e);
        });
        req.end();
    });
}

async function runTests() {
    console.log("Starting API Filter Tests...");

    // Test 1: Gender = Boys
    await testFilter("Gender: Boys", "gender=Boys");

    // Test 2: Mess Available = true
    await testFilter("Mess: Available", "mess=true");

    // Test 3: Min Rating = 4.5
    await testFilter("Rating: 4.5+", "minRating=4.5");

    // Test 4: Combine All
    await testFilter("Combined: Boys + Mess + 4.0+", "gender=Boys&mess=true&minRating=4.0");
}

runTests();
