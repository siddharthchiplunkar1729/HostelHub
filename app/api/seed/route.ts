import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HostelBlock from '@/models/HostelBlock';
import Student from '@/models/Student';
import Complaint from '@/models/Complaint';
import MessMenu from '@/models/MessMenu';
import Notice from '@/models/Notice';
import User from '@/models/User';
import HostelApplication from '@/models/HostelApplication';

export async function GET() {
    try {
        console.log('--- Starting Seed Process ---');
        await dbConnect();
        console.log('Database connected');

        // Clear existing data sequentially to avoid race conditions
        console.log('Clearing existing collections...');
        await User.deleteMany({});
        await Student.deleteMany({});
        await HostelBlock.deleteMany({});
        await HostelApplication.deleteMany({});
        await Complaint.deleteMany({});
        await Notice.deleteMany({});

        // Specific fix for MessMenu: drop index if exists or drop collection
        try {
            await MessMenu.collection.drop();
        } catch (e) {
            // Collection might not exist, ignore
        }
        console.log('Collections cleared');

        // 1. Seed Users (Admin, Wardens, Students)
        console.log('Seeding Users...');
        const usersData = [
            { email: 'admin@hostelhub.com', password: 'password123', role: 'Admin', name: 'System Admin', phone: '+91 0000000000' },
            { email: 'rajesh@hostel.com', password: 'password123', role: 'Warden', name: 'Dr. Rajesh Kumar', phone: '+91 9876543210' },
            { email: 'priya@hostel.com', password: 'password123', role: 'Warden', name: 'Dr. Priya Sharma', phone: '+91 9876543211' },
            { email: 'rahul@student.com', password: 'password123', role: 'Student', name: 'Rahul Verma', phone: '+91 9876543214' },
            { email: 'priya.g@student.com', password: 'password123', role: 'Student', name: 'Priya Gupta', phone: '+91 9876543216' },
            { email: 'arnav@student.com', password: 'password123', role: 'Student', name: 'Arnav Singh', phone: '+91 9999999999' }
        ];

        const users = [];
        for (const u of usersData) {
            console.log(`Creating user: ${u.email}`);
            const newUser = await User.create(u);
            users.push(newUser);
        }
        console.log('Users seeded successfully');

        // Helper to generate room data
        const generateRooms = (count: number) => {
            return Array.from({ length: count }, (_, i) => ({
                roomNumber: `${Math.floor(i / 20) + 1}0${(i % 20) + 1}`,
                status: Math.random() > 0.3 ? 'Full' : 'Available',
                occupants: Math.random() > 0.5 ? 2 : 1,
                capacity: 2
            }));
        };

        const hostelBlocks = await HostelBlock.insertMany([
            {
                blockName: 'A Block',
                type: 'Boys',
                description: 'Modern hostel block with state-of-the-art facilities.',
                totalRooms: 100,
                availableRooms: 15,
                occupiedRooms: 85,
                rooms: generateRooms(100),
                wardenInfo: {
                    name: 'Dr. Rajesh Kumar',
                    phone: '+91 9876543210',
                    email: 'rajesh@hostel.com'
                },
                wardenUserId: users[1]._id,
                approvalStatus: 'Approved',
                location: 'North Campus',
                facilities: ['WiFi', 'Gym', 'Library', 'Mess'],
                rating: 4.5,
                reviews: [
                    {
                        rating: 5,
                        reviewText: 'Excellent facilities and very clean!',
                        helpful: 12,
                        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    }
                ],
                comments: [
                    {
                        userType: 'Student',
                        text: 'Are there any single rooms available?',
                        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
                    }
                ]
            },
            {
                blockName: 'B Block',
                type: 'Girls',
                description: 'Secure and comfortable hostel with 24/7 security.',
                totalRooms: 80,
                availableRooms: 8,
                occupiedRooms: 72,
                rooms: generateRooms(80),
                wardenInfo: {
                    name: 'Dr. Priya Sharma',
                    phone: '+91 9876543211',
                    email: 'priya@hostel.com'
                },
                wardenUserId: users[2]._id,
                approvalStatus: 'Approved',
                location: 'South Campus',
                facilities: ['WiFi', 'Mess', 'Laundry'],
                rating: 4.7
            },
            {
                blockName: 'Z Block (Pending)',
                type: 'Co-ed',
                description: 'New hostel block awaiting verification.',
                totalRooms: 50,
                availableRooms: 50,
                occupiedRooms: 0,
                rooms: generateRooms(50).map(r => ({ ...r, status: 'Available', occupants: 0 })),
                wardenInfo: {
                    name: 'Mr. Unverified',
                    phone: '+91 1111111111',
                    email: 'unverified@hostel.com'
                },
                approvalStatus: 'Pending',
                location: 'East Campus',
                facilities: ['WiFi']
            }
        ]);
        console.log('Hostel Blocks seeded');

        // 3. Seed Students
        console.log('Seeding Students...');
        const studentDocs = await Student.insertMany([
            {
                name: 'Rahul Verma',
                email: 'rahul@student.com',
                phone: '+91 9876543214',
                rollNumber: 'CS2023001',
                course: 'Computer Science',
                year: 2,
                department: 'CSE',
                hostelBlockId: hostelBlocks[0]._id,
                enrollmentStatus: 'Enrolled',
                dashboardAccessGranted: new Date(),
                loginCredentialsIssued: true,
                guardianInfo: {
                    name: 'Mr. Suresh Verma',
                    relation: 'Father',
                    phone: '+91 9876543215'
                },
                emergencyContact: '+91 9876543215'
            },
            {
                name: 'Priya Gupta',
                email: 'priya.g@student.com',
                phone: '+91 9876543216',
                rollNumber: 'EC2024015',
                course: 'Electronics',
                year: 1,
                department: 'ECE',
                hostelBlockId: hostelBlocks[1]._id,
                enrollmentStatus: 'Enrolled',
                dashboardAccessGranted: new Date(),
                loginCredentialsIssued: true,
                guardianInfo: {
                    name: 'Mrs. Anjali Gupta',
                    relation: 'Mother',
                    phone: '+91 9876543217'
                },
                emergencyContact: '+91 9876543217'
            },
            {
                name: 'Arnav Singh',
                email: 'arnav@student.com',
                phone: '+91 9999999999',
                rollNumber: 'ME2024099',
                course: 'Mechanical',
                year: 1,
                department: 'ME',
                enrollmentStatus: 'Applied',
                guardianInfo: {
                    name: 'Mr. Singh',
                    relation: 'Father',
                    phone: '+91 8888888888'
                },
                emergencyContact: '+91 8888888888'
            }
        ]);
        console.log('Students seeded');

        // Update User models with studentId
        console.log('Linking Users to Students...');
        await User.findOneAndUpdate({ email: 'rahul@student.com' }, { studentId: studentDocs[0]._id, enrolledHostelId: hostelBlocks[0]._id, canAccessDashboard: true });
        await User.findOneAndUpdate({ email: 'priya.g@student.com' }, { studentId: studentDocs[1]._id, enrolledHostelId: hostelBlocks[1]._id, canAccessDashboard: true });
        await User.findOneAndUpdate({ email: 'arnav@student.com' }, { studentId: studentDocs[2]._id });
        console.log('User links updated');

        // 4. Seed Applications
        console.log('Seeding Applications...');
        await HostelApplication.create({
            studentId: studentDocs[2]._id,
            hostelBlockId: hostelBlocks[0]._id,
            status: 'Pending',
            applicationData: {
                course: 'Mechanical',
                year: 1,
                preferredRoomType: 'Double Share',
                moveInDate: new Date('2024-02-15')
            }
        });
        console.log('Applications seeded');

        // 5. Seed Per-Hostel Notices
        console.log('Seeding Notices...');
        await Notice.insertMany([
            {
                title: 'Water Supply Maintenance',
                content: 'Water supply will be suspended in A Block tomorrow from 2-4 PM.',
                hostelBlockId: hostelBlocks[0]._id,
                from: { role: 'Warden', name: 'Dr. Rajesh Kumar' },
                priority: 'High'
            },
            {
                title: 'Cleanliness Drive',
                content: 'Join us for the B Block cleanliness drive this Sunday.',
                hostelBlockId: hostelBlocks[1]._id,
                from: { role: 'Warden', name: 'Dr. Priya Sharma' },
                priority: 'Medium'
            }
        ]);
        console.log('Notices seeded');

        // 6. Seed Per-Hostel Mess Menu
        console.log('Seeding Mess Menu...');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await MessMenu.create([
            {
                hostelBlockId: hostelBlocks[0]._id,
                date: today,
                day: 'Monday',
                meals: [
                    {
                        mealType: 'Lunch',
                        items: ['Rice', 'Dal', 'Aloo Paneer'],
                        isVeg: true
                    }
                ]
            },
            {
                hostelBlockId: hostelBlocks[1]._id,
                date: today,
                day: 'Monday',
                meals: [
                    {
                        mealType: 'Lunch',
                        items: ['Rice', 'Dal', 'Ladyfinger Fry'],
                        isVeg: true
                    }
                ]
            }
        ]);
        console.log('Mess Menu seeded');

        console.log('--- Seed Process Completed Successfully ---');
        return NextResponse.json({
            success: true,
            message: 'Marketplace database seeded successfully!',
            data: {
                users: users.length,
                hostelBlocks: hostelBlocks.length,
                students: studentDocs.length,
                applications: 1,
                notices: 2,
                menus: 2
            }
        });
    } catch (error: any) {
        console.error('CRITICAL SEED ERROR:', error);
        return NextResponse.json(
            {
                error: error.message || 'An unknown error occurred during seeding',
                details: typeof error === 'object' ? error : String(error)
            },
            { status: 500 }
        );
    }
}

