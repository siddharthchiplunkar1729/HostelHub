import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HostelBlock from '@/models/HostelBlock';

// GET /api/admin/hostels - List all hostels for admin with optional status filter
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        let query: any = {};
        if (status) {
            query.approvalStatus = status;
        }

        const hostels = await HostelBlock.find(query).sort({ createdAt: -1 });

        return NextResponse.json(hostels);
    } catch (error) {
        console.error('Error fetching hostels for admin:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hostels' },
            { status: 500 }
        );
    }
}
