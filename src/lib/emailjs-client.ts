'use client';
import emailjs from '@emailjs/browser';

// IMPORTANT: Replace with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_r4sudew';
const EMAILJS_PUBLIC_KEY = '8ewrNO17AJqS0T2b-';

// Grievance Template
const EMAILJS_GRIEVANCE_TEMPLATE_ID = 'template_zo132lj';
interface GrievanceEmailParams {
    student_name: string;
    to_email: string;
    ticket_id: string;
    new_status: string;
    admin_remarks: string;
    from_name: string;
    grievance_category: string;
    submission_date: string;
}

// Thank You Template
const EMAILJS_THANKYOU_TEMPLATE_ID = 'template_3y0autb'; 
interface ThankYouEmailParams {
    name: string;
    to_email: string;
}

// Password Reset Template
const EMAILJS_PASSWORD_RESET_TEMPLATE_ID = 'template_xrp6rl8';
interface PasswordResetEmailParams {
    name: string;
    to_email: string;
    reset_link: string;
}


/**
 * Sends a status update email to a student regarding their grievance.
 * @param params - The parameters for the email template.
 */
export const sendGrievanceStatusUpdateEmail = (params: GrievanceEmailParams): Promise<void> => {
    
    const templateParams = {
        ...params,
        submission_date: new Date(params.submission_date).toLocaleDateString(),
    };

    return new Promise((resolve, reject) => {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_GRIEVANCE_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then((response) => {
                console.log('Grievance Email SUCCESS!', response.status, response.text);
                resolve();
            }, (error) => {
                console.error('EmailJS FAILED...', error);
                const errorMessage = `EmailJS error: status ${error?.status}, text: ${error?.text || 'Unknown error'}`;
                reject(new Error(errorMessage));
            });
    });
};


/**
 * Sends a thank you email for feedback.
 * @param params - The parameters for the thank you email template.
 */
export const sendThankYouEmail = (params: ThankYouEmailParams): Promise<void> => {
    if (EMAILJS_THANKYOU_TEMPLATE_ID === 'YOUR_THANK_YOU_TEMPLATE_ID_HERE') {
        const errorMsg = "EmailJS Thank You Template ID is not configured in src/lib/emailjs-client.ts";
        console.error(errorMsg);
        return Promise.reject(new Error(errorMsg));
    }

    return new Promise((resolve, reject) => {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_THANKYOU_TEMPLATE_ID, params, EMAILJS_PUBLIC_KEY)
            .then((response) => {
                console.log('Thank You Email SUCCESS!', response.status, response.text);
                resolve();
            }, (error) => {
                console.error('Thank You Email FAILED...', error);
                const errorMessage = `EmailJS error: status ${error?.status}, text: ${error?.text || 'Unknown error'}`;
                reject(new Error(errorMessage));
            });
    });
};

/**
 * Sends a password reset email to a user.
 * @param params - The parameters for the password reset email template.
 */
export const sendPasswordResetEmail = (params: PasswordResetEmailParams): Promise<void> => {
    if (EMAILJS_PASSWORD_RESET_TEMPLATE_ID === 'YOUR_PASSWORD_RESET_TEMPLATE_ID') {
        const errorMsg = "EmailJS Password Reset Template ID is not configured. Please create a template in your EmailJS account and update the constant in `src/lib/emailjs-client.ts`.";
        console.error(errorMsg);
        return Promise.reject(new Error(errorMsg));
    }
    
    return new Promise((resolve, reject) => {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_PASSWORD_RESET_TEMPLATE_ID, params, EMAILJS_PUBLIC_KEY)
            .then((response) => {
                console.log('Password Reset Email SUCCESS!', response.status, response.text);
                resolve();
            }, (error) => {
                console.error('Password Reset Email FAILED...', error);
                const errorMessage = `EmailJS error: status ${error?.status}, text: ${error?.text || 'Unknown error'}`;
                reject(new Error(errorMessage));
            });
    });
};
