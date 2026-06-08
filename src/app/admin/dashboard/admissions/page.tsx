
'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AdmissionsRedirectPage() {
    useEffect(() => {
        redirect('/admin/dashboard/students');
    }, []);

    return (
        <div>
            Redirecting to Students page...
        </div>
    );
}
