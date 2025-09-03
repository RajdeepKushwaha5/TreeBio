import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    let databaseStatus = 'unknown';
    let databaseError = null;
    
    try {
      // Try a simple database operation
      if (db && typeof (db as any).$queryRaw === 'function') {
        await (db as any).$queryRaw`SELECT 1`;
        databaseStatus = 'connected';
      } else {
        databaseStatus = 'mock';
      }
    } catch (error) {
      databaseStatus = 'error';
      databaseError = error instanceof Error ? error.message : 'Unknown database error';
    }
    
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: {
        status: databaseStatus,
        error: databaseError,
        url: process.env.DATABASE_URL ? '***configured***' : 'not configured'
      },
      pusher: {
        configured: !!(
          process.env.PUSHER_APP_ID && 
          process.env.NEXT_PUBLIC_PUSHER_KEY && 
          process.env.PUSHER_SECRET && 
          process.env.NEXT_PUBLIC_PUSHER_CLUSTER
        ),
        status: 'optional service'
      },
      clerk: {
        configured: !!(
          process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
          process.env.CLERK_SECRET_KEY
        )
      }
    };
    
    return NextResponse.json(healthData);
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
