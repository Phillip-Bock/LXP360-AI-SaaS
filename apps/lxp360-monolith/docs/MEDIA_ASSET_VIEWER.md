# Media Asset Viewer Integration

## Overview
The Media Asset Viewer has been successfully integrated from the external team's repository into LXP360-SaaS. This system provides comprehensive media management capabilities with Sanity CMS integration.

## Features Integrated

### 1. Asset Management
- **Upload**: Support for images, videos, audio, 3D models, and 360° content
- **Preview**: Inline preview for supported formats (images, videos, audio)
- **Metadata**: Title, description, tags, status, version tracking
- **Search**: Filter assets by title and tags

### 2. Asset Locking
- Lock/unlock assets to prevent concurrent editing
- Track who locked an asset and when
- Automatic lock expiration support

### 3. Version Control
- Track asset versions
- Usage count monitoring
- Update history

### 4. Sanity Integration
- Custom Sanity schemas for `mediaAsset` and `user`
- Real-time updates via Sanity listeners
- Server-side asset upload handling

## File Structure

\`\`\`
app/
  media-assets/
    page.tsx                    # Main media asset viewer page
  api/
    media/
      upload/
        route.ts                # Upload API endpoint
      patch/
        [id]/
          route.ts              # Update API endpoint

components/
  media/
    asset-preview.tsx           # Preview component for different media types
    upload-form.tsx             # File upload form

lib/
  types/
    media-asset.ts              # TypeScript types for media assets

sanity/
  schemas/
    mediaAsset.ts               # Sanity schema for media assets
    user.ts                     # Sanity schema for users
    index.ts                    # Schema exports (updated)
\`\`\`

## Usage

### Accessing the Media Asset Viewer
Navigate to `/media-assets` in your application.

### Uploading Assets
1. Click the "Upload New" tab
2. Select a file
3. Enter a title (optional, defaults to filename)
4. Choose asset type
5. Click "Upload"

### Managing Assets
1. Browse assets in the "Browse Assets" tab
2. Click an asset to view details
3. Edit title and description inline
4. Lock/unlock assets as needed
5. Download assets using the download button

### Searching Assets
Use the search bar to filter assets by title or tags.

## API Endpoints

### POST /api/media/upload
Upload a new media asset to Sanity.

**Body**: FormData
- `file`: File to upload
- `title`: Asset title (optional)
- `assetKind`: Asset type (2D Image, Video, Audio, etc.)

**Response**:
\`\`\`json
{
  "ok": true,
  "asset": { /* Sanity document */ }
}
\`\`\`

### POST /api/media/patch/[id]
Update an existing media asset.

**Body**: JSON
\`\`\`json
{
  "title": "New title",
  "description": "New description",
  "status": "published"
}
\`\`\`

Or to unlock:
\`\`\`json
{
  "unlock": true
}
\`\`\`

**Response**:
\`\`\`json
{
  "ok": true
}
\`\`\`

## Dependencies Added
- `react-player`: For video/audio preview
- `@sanity/image-url`: For Sanity image URL generation

## Next Steps

### Recommended Enhancements
1. **User Authentication**: Integrate with Supabase auth to track actual users
2. **Permissions**: Add RBAC to control who can upload/edit/delete assets
3. **Bulk Operations**: Add ability to select and operate on multiple assets
4. **Advanced Filters**: Add filters by asset type, status, date range
5. **Asset Collections**: Group related assets into collections
6. **Usage Tracking**: Show where assets are used in courses/lessons
7. **Thumbnail Generation**: Auto-generate thumbnails for videos
8. **CDN Integration**: Optimize asset delivery with CDN

### Known Limitations
1. Lock system uses placeholder user reference ("current-user")
2. No actual user authentication integration yet
3. No permission checks on upload/edit operations
4. No asset deletion functionality
5. No bulk upload support

## Troubleshooting

### Assets not loading
- Check Sanity environment variables are set correctly
- Verify Sanity dataset has the `mediaAsset` schema deployed
- Check browser console for errors

### Upload failing
- Verify file size is within Sanity limits (default 200MB)
- Check Sanity write token has correct permissions
- Ensure API route is accessible

### Preview not working
- For videos: Check `react-player` supports the format
- For 3D models: Browser may not support inline preview
- Check file URL is accessible

## Support
For issues or questions, refer to the main project documentation or contact the development team.
