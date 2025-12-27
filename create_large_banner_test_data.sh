#!/bin/bash

# Script to create test data for Large Banner sections in Book Realm

echo "Creating Large Banner Test Data..."
echo "=================================="

# Base URL
BASE_URL="http://localhost:5000"

# Step 1: Create a Large Banner
echo ""
echo "Step 1: Creating Large Banner..."
BANNER_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/banners/large-banner" \
  -H "Content-Type: application/json" \
  -d '{
    "placeHolder": "Summer Reading Sale - Up to 50% Off",
    "clickUrl": "/filter",
    "bannerImage": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop",
    "order": 1
  }')

echo "Banner Response: $BANNER_RESPONSE"

# Extract banner ID from response (assuming it returns the created banner with id)
BANNER_ID=$(echo $BANNER_RESPONSE | jq -r '.id' 2>/dev/null)

if [ -z "$BANNER_ID" ] || [ "$BANNER_ID" = "null" ]; then
  echo "Failed to create banner or extract ID"
  echo "Response: $BANNER_RESPONSE"
  exit 1
fi

echo "Created Banner ID: $BANNER_ID"

# Step 2: Create a Home Page Section for Large Banner
echo ""
echo "Step 2: Creating Home Page Section for Large Banner..."
SECTION_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/home/large-banner-section" \
  -H "Content-Type: application/json" \
  -d "{
    \"sectionName\": \"LargeBanner\",
    \"sectionType\": \"LargeBanner\",
    \"banners\": [\"$BANNER_ID\"]
  }")

echo "Section Response: $SECTION_RESPONSE"

# Step 3: Verify the home page sections
echo ""
echo "Step 3: Verifying home page sections..."
curl -s "${BASE_URL}/api/home" | jq '.[] | select(.sectionType == "LargeBanner")'

echo ""
echo "=================================="
echo "Test data creation complete!"
echo ""
echo "You can now view the large banner on the home page at:"
echo "http://localhost:4200/home"
