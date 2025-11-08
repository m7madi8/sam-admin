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

### Step 1: Get Your GetForm.io API Key

1. Go to [GetForm.io](https://getform.io) and log in to your account
2. Navigate to **Settings** > **API Keys**
3. Create a new API key or copy your existing one
4. Keep this key safe and secure

### Step 2: Configure the Dashboard

1. Open `admin-dashboard.html` in your web browser
2. Click the **API Key** button in the header
3. Enter your GetForm.io API key when prompted
4. The dashboard will automatically fetch and display all form submissions

### Step 3: Access the Dashboard

Simply open `admin-dashboard.html` in any modern web browser. The dashboard will:
- Use the API key stored in browser localStorage
- Fetch real-time data from GetForm.io
- Display all form submissions in an organized, filterable interface

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

## Integration with GetForm.io

The dashboard is configured to work with the GetForm.io form endpoint: `azywqpqb`

### Current Form Submissions
- **Interior Design**: `assets/pages/index-interior.html`
- **Exterior Design**: `assets/pages/index-exterior.html`
- **Landscape Design**: `assets/pages/index-landscape.html`
- **Contact Messages**: Currently submits to `thanks.html` (needs to be updated to GetForm.io)

### Updating Contact Form

To include contact form messages in the dashboard, update the contact form in `index.html`:

```html
<form action="https://getform.io/f/azywqpqb" method="POST">
    <input type="hidden" name="Service" value="Message">
    <input type="text" name="name" placeholder="Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <textarea name="message" placeholder="Message" required></textarea>
    <input type="hidden" name="_redirect" value="assets/pages/thanks.html">
    <button type="submit">Send</button>
</form>
```

## Security Notes

⚠️ **Important Security Considerations**:

1. **API Key Storage**: The API key is stored in browser localStorage. For production use, consider:
   - Implementing a backend server to handle API calls
   - Using environment variables for API keys
   - Implementing user authentication

2. **Access Control**: This dashboard has no authentication. Consider:
   - Adding login functionality
   - Restricting access to authorized users only
   - Using HTTPS for the dashboard

3. **Data Privacy**: Be mindful of:
   - Client data privacy regulations
   - Secure handling of personal information
   - Regular data backups

## Troubleshooting

### Dashboard shows "No Requests Found"
- Check if your API key is set correctly
- Verify the GetForm.io form endpoint is correct
- Check browser console for errors
- Ensure you have form submissions in GetForm.io

### API Key Not Working
- Verify the API key is correct in GetForm.io dashboard
- Check if the API key has proper permissions
- Try removing and re-adding the API key
- Check browser console for API errors

### Data Not Updating
- Click the "Refresh" button manually
- Check if auto-refresh is enabled (every 5 minutes)
- Verify your internet connection
- Check GetForm.io service status

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
2. Verify GetForm.io API status
3. Review this documentation
4. Contact your developer for assistance

## Future Enhancements

Potential improvements:
- User authentication and login
- Backend API integration
- Real-time notifications for new submissions
- Advanced analytics and reporting
- Email integration for client communication
- Calendar integration for appointments
- Task management and notes
- Client relationship management (CRM) features

