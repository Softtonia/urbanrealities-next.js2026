// 📁 postPropertyConfig.js

export const postPropertyConfig = {
  "Rent / Lease": {
    Residential: {
      "Flat/Apartment": {
        profileFields: ["BHK", "Bathrooms", "Balconies", "Furnishing", "Floor No.", "Total Floors", "Carpet Area", "Built-up Area", "Super Built-up Area", "Parking"],
        pricingFields: ["Expected Rent", "Security Deposit", "Lock-in Period", "Maintenance Charges", "Available From", "Electricity & Water Excluded", "Is Rent Negotiable", "Notice Period", "Annual Rent Hike"]
      },
      "Independent House / Villa": {
        profileFields: ["BHK", "Bathrooms", "Balconies", "Furnishing", "Total Floors", "Carpet Area", "Plot Area", "Servant Room", "Store Room", "Parking"],
        pricingFields: ["Expected Rent", "Security Deposit", "Lock-in Period", "Maintenance Charges", "Available From", "Electricity & Water Excluded", "Is Rent Negotiable", "Notice Period"]
      },
      "Independent / Builder Floor": {
        profileFields: ["BHK", "Bathrooms", "Furnishing", "Floor No.", "Carpet Area", "Built-up Area", "Parking"],
        pricingFields: ["Expected Rent", "Security Deposit", "Maintenance Charges", "Available From", "Notice Period"]
      },
      "Plot / Land": {
        profileFields: ["Plot Area", "Gated Colony", "Facing"],
        pricingFields: ["Expected Rent", "Maintenance Charges", "Available From"]
      },
      "1 RK/ Studio Apartment": {
        profileFields: ["Rooms", "Bathrooms", "Furnishing", "Floor No.", "Carpet Area", "Built-up Area"],
        pricingFields: ["Expected Rent", "Security Deposit", "Maintenance Charges"]
      },
      "Serviced Apartment": {
        profileFields: ["Rooms", "Bathrooms", "Servant Room", "Furnishing", "Carpet Area"],
        pricingFields: ["Expected Rent", "Service Charges", "Security Deposit"]
      },
      "Farmhouse": {
        profileFields: ["BHK", "Plot Area", "Built-up Area", "Furnishing", "Servant Room", "Store Room"],
        pricingFields: ["Expected Rent", "Maintenance Charges", "Security Deposit"]
      },
      "Other": {
        profileFields: ["Property Description", "Built-up Area"],
        pricingFields: ["Expected Rent", "Maintenance Charges", "Security Deposit"]
      }
    },
    Commercial: {
      "Office Space": {
        subOptions: {
          "Bare Shell": {
            profileFields: ["Floor No.", "Total Floors", "Built-up Area", "Ceiling Height", "Pantry", "Washroom", "Loading Dock", "Reception", "Parking"],
            pricingFields: ["Expected Rent", "CAM Charges", "Security Deposit", "Lock-in Period", "Electricity & Water Excluded", "Is Rent Negotiable", "Maintenance Charges"]
          },
          "Furnished": {
            profileFields: ["Built-up Area", "Workstations", "Meeting Rooms", "Cabins", "Reception", "Pantry", "Parking"],
            pricingFields: ["Expected Rent", "Security Deposit", "Maintenance Charges", "Is Rent Negotiable"]
          },
          "Ready to Move": {
            profileFields: ["Floor No.", "Built-up Area", "Reception", "Washroom", "Parking"],
            pricingFields: ["Expected Rent", "Security Deposit", "Maintenance Charges"]
          },
          "Under Construction": {
            profileFields: ["Floor No.", "Built-up Area", "Expected Completion Date"],
            pricingFields: ["Expected Rent", "Security Deposit"]
          }
        }
      },
      "Shop": {
        profileFields: ["Built-up Area", "Floor No.", "Furnishing", "Ceiling Height", "Washroom"],
        pricingFields: ["Expected Rent", "Maintenance Charges", "Security Deposit", "Electricity & Water Excluded"]
      },
      "Showroom": {
        profileFields: ["Built-up Area", "Floor No.", "Total Floors", "Furnishing", "Ceiling Height"],
        pricingFields: ["Expected Rent", "Security Deposit", "Maintenance Charges", "Is Rent Negotiable"]
      },
      "Commercial Land": {
        profileFields: ["Plot Area", "Facing", "Zone Type"],
        pricingFields: ["Expected Rent", "Security Deposit"]
      },
      "Warehouse / Godown": {
        profileFields: ["Built-up Area", "Floor Height", "Dock Availability", "Power Backup"],
        pricingFields: ["Expected Rent", "Maintenance Charges", "Security Deposit"]
      },
      "Industrial Building": {
        profileFields: ["Built-up Area", "Power Backup", "Furnishing", "Washroom"],
        pricingFields: ["Expected Rent", "Maintenance Charges", "Security Deposit"]
      },
      "Co-working Space": {
        profileFields: ["Total Workstations", "Meeting Rooms", "Cabins", "Reception", "Built-up Area"],
        pricingFields: ["Expected Rent", "Security Deposit", "Service Charges"]
      },
      "Other": {
        profileFields: ["Property Description", "Built-up Area"],
        pricingFields: ["Expected Rent", "Maintenance Charges", "Security Deposit"]
      }
    }
  }
};
