async function testLogin() {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'rahul@student.com',
                password: 'password123'
            })
        });
        const data = await response.json();
        console.log('Login Status:', response.status);
        console.log('Login Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Login Failed:', error.message);
    }
}

testLogin();
