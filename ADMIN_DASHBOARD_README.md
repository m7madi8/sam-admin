# Admin Dashboard - Setup Guide

## Overview
The Admin Dashboard is a comprehensive management system for viewing and managing all design requests and messages submitted through the Samar Ammar Interior Design website.

## Features

### 📊 Dashboard Features
- **View All Requests**: See all interior, exterior, landscape design requests and contact messages
- **Filter & Search**: Filter by service type, project type, status, date, and search by name, phone, or location
- **Detailed View**: Click on any request to see full details in a modal
- **Quick Actions**: Call, WhatsApp, view details, and delete requests directly from cards
- **Statistics**: View total requests, new requests, and today's requests in the sidebar
- **Export Data**: Export filtered data to CSV format
- **Status Management**: Mark requests as viewed or archived
- **Auto-refresh**: Automatically refreshes data every 5 minutes when API key is set

### 🎨 Service Types
- **Interior Design**: Requests for interior design services
- **Exterior Design**: Requests for exterior/facade design services
- **Landscape Design**: Requests for garden/landscape design services
- **Messages**: General contact messages from the contact form

## Setup Instructions

### Step 1: Firebase / Firestore

Form submissions (contact, booking, interior/exterior/landscape requests) are stored in **Firebase Firestore** in the `requests` collection. See `FIREBASE_SETUP.md` and `FIRESTORE_CREATE_STEPS.md` for database setup and security rules.

### Step 2: Access the Dashboard

1. Open **`f1.html`** in your web browser (admin dashboard).
2. Log in using the admin password (see **Admin Login** below). Credentials are validated via `admin-auth.js` (created from `admin-auth.example.js`).
3. The dashboard reads requests from Firestore and displays them in an organized, filterable interface.

## Usage Guide

### Viewing Requests

1. **All Requests**: Click "All Requests" in the sidebar to see everything
2. **By Service Type**: Click on specific service types (Interior, Exterior, Landscape, Messages) to filter
3. **Search**: Use the search box to find requests by name, phone, or location
4. **Filters**: Use the filter dropdowns to narrow down results:
   - Service Type
   - Project Type (Residential/Commercial)
   - Status (New/Viewed/Archived)
   - Date Range

### Managing Requests

1. **View Details**: Click the "Details" button on any card to see full information
2. **Call Client**: Click "Call" to initiate a phone call
3. **WhatsApp**: Click "WhatsApp" to open WhatsApp with the client's number
4. **Change Status**: In the details modal, mark requests as "Viewed" or "Archive"
5. **Delete**: Click the delete button to remove a request (with confirmation)

### Exporting Data

1. Apply any filters you want to export
2. Click the "Export" button in the header
3. A CSV file will be downloaded with all filtered data

## Data Structure

Each request contains the following information:

- **Type**: Service type (Interior Design, Exterior Design, Landscape Design, Message)
- **Name**: Client's full name
- **Phone**: Contact phone number
- **Email**: Email address (if provided)
- **Location**: City/Area
- **Construction Status**: Empty Land, Renovation, From Scratch, Concrete Structure
- **Area**: Approximate area in m²
- **Project Type**: Residential or Commercial
- **Notes**: Additional information from the client
- **Date**: Submission date and time
- **Status**: New, Viewed, or Archived

## Integration with Firebase Firestore

All form submissions are stored in Firestore collection **`requests`**:

- **Contact messages**: `index.html` contact form → `handleFirebaseSubmit(event, 'Message', …)`
- **Booking**: `assets/pages/booking.html` → `handleBookingFirebaseSubmit`
- **Interior / Exterior / Landscape**: `assets/pages/index-interior.html`, `index-exterior.html`, `index-landscape.html` → `handleFirebaseSubmit` with respective service type

The dashboard (**f1.html**) reads from this same `requests` collection. No GetForm.io or external form endpoint is used.

## Admin Login (لوحة التحكم f1.html)

تسجيل الدخول يعتمد على ملف **admin-auth.js** (لا يُرفع إلى Git):

1. انسخ `assets/js/admin-auth.example.js` إلى `assets/js/admin-auth.js`.
2. ولّد hash كلمة السر كما في التعليقات داخل الملف (دالة في وحدة التحكم).
3. ضع الناتج في `passwordHash` داخل `admin-auth.js`.

كلمة السر لا تُخزّن في الكود؛ يُخزّن فقط hash في ملف مستثنى من Git.

## Security Notes

⚠️ **Important Security Considerations**:

1. **Admin credentials**: Use `admin-auth.js` (from `admin-auth.example.js`). Never commit `admin-auth.js` — it is in `.gitignore`. Only the password hash is stored, not the plain password.

2. **Firestore**: Keep Firestore Security Rules strict (e.g. allow create for requests; restrict read/delete to your app or backend). In Firebase Console, restrict the Web API key to your domains.

3. **Access**: The dashboard is client-side only. For stronger protection, consider excluding `/f1.html` from search engines (e.g. robots.txt) or placing it behind server-side auth.

4. **Data privacy**: Handle client data according to your privacy policy; use HTTPS in production.

## Troubleshooting

### Dashboard shows "No Requests Found"
- Ensure you are logged in (f1.html uses admin-auth.js).
- Verify Firestore is set up and the `requests` collection exists (see FIREBASE_SETUP.md).
- Check Firestore security rules allow read for your app/admin flow.
- Check browser console for errors.

### Login / Access Issues
- Ensure `admin-auth.js` exists (copy from `admin-auth.example.js`) and contains a valid password hash.
- Check that `admin-auth.js` is not in Git (it is in .gitignore).

### Data Not Updating
- Click the "Refresh" button manually if available.
- Verify your internet connection and Firebase/Firestore status.
- Check browser console for permission or network errors.

### Export Not Working
- Ensure you have data displayed (not filtered out)
- Check browser download permissions
- Try a different browser

## Browser Compatibility

The dashboard works best with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify Firebase/Firestore setup and security rules (FIREBASE_SETUP.md, SECURITY.md)
3. Review this documentation
4. Contact your developer for assistance

## Future Enhancements

Potential improvements:
- User authentication and login
- Backend API integration
- Advanced analytics and reporting
- Email integration for client communication
- Calendar integration for appointments
- Task management and notes
- Client relationship management (CRM) features

