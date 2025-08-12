import { FaUserAlt, FaRegListAlt } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { TbFileSearch } from "react-icons/tb";
import { AiOutlineBug } from "react-icons/ai"; // ✅ sahi jagah se

export const helpTopics = [
  {
    id: "user-profile",
    title: "User Profile",
    icon: <FaUserAlt />,
    topics: [
      { id: "new-registration-login",
         title: "New Registration & Login",
         usericon: <FaUserAlt />,
        subtopics: [ 
                    {
                        id: "new-registration",
                        title: "New Registration",
                        questions: [
                                                      {
                                id: "is-registration-free",
                                title: "Is registration on UrbanRealities FREE? Where to register?",
                                content: `<p>Yes! Registration on UrbanRealities is completely FREE. You can register by clicking on the 'Sign Up' button on the top right of the page.</p>`
                            },
                        ]
                    },
                    {
                        id: "login",
                        title: "Login",
                        questions: [
                        ]
                      }
        ]
       },
      { id: "account-management", title: "Account Deactivation/Re-activation" },
      { id: "my-profile", title: "My Profile" },
      { id: "password-settings", title: "Password Settings" },
      { id: "update-email", title: "Update Email Address" },
      { id: "update-mobile", title: "Update Mobile Number" },
      { id: "manage-calls-alerts", title: "Manage Calls/Alerts" },
    ],
  },
  {
     id: "property-management",
    icon: <FaRegListAlt />,
    title: "Property Management",
    topics: [
      { id: "free-property-listing", title: "Free Property Listing" },
      { id: "posting-property", title: "Posting Property" },
      { id: "edit-update-property", title: "Edit/Update Property Details" },
      { id: "locality-update", title: "Locality Update" },
      { id: "upload-edit-photos", title: "Upload/Edit Photos" },
      { id: "property-status", title: "Property Status" },
    ],
  },
  {
    id: "response-management",
    icon: <MdManageAccounts />,
    title: "Response Management",
    topics: [
      {
        id: "view-response-property",
        title: "View Response on Property Posted",
      },
      {
        id: "download-responses-property",
        title: "Download Responses on Property Posted",
      },
      {
        id: "protection-online-frauds",
        title: "Protection From Online Frauds",
      },
    ],
  },
  {
    id: "orders-services",
    icon: <BsBoxSeam />,
    title: "Orders & Services",
    topics: [
      {
        id: "promoting-buy-ad-packages",
        title: "Promoting to Buy Ad Packages",
      },
      { id: "package-activation", title: "Package Activation" },
      { id: "my-package-details", title: "My Package Details" },
      { id: "package-services", title: "Package Services" },
    ],
  },
  {
    id: "mb-features",
    icon: <TbFileSearch />,
    title: "MB Features",
    topics: [
      { id: "what-is-propwitty", title: "What is Propwitty?" },
      {
        id: "all-about-property-auctions",
        title: "All About Property Auctions",
      },
      { id: "forum-for-all", title: "Forum For All" },
    ],
  },
  {
     id: "bug-bounty",
    icon: <AiOutlineBug />,
    title: "Bug Bounty",
    topics: [{ id: "submit-bug-report", title: "Submit Bug Report" }],
  },
];
