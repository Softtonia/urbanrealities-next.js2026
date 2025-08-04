'use client';
import "./DropdownMegaMenu.css";
// import SellData from "../MobileMenudata/SellData";

const menusell = [
  {
    heading: "For Owner",
    items: [
      { name: "Post Property", badge: "FREE" },
      { name: "My Dashboard" },
    ],
    extraInfo: {
      title: "Sell / Rent Ad Packages",
      contact: "+91 9870 260 930 / ",
      email: "Email Us",
      emailHref: "#",
    },
  },
  {
    heading: "For Agent & Builder",
    items: [
      { name: "My Dashboard" },
      { name: "Developer Lounge" },
      { name: "Sales Enquiry" },
    ],
    extraInfo: {
      title: "Ad Packages",
      contact: "0120-5135525",
    },
  },
  {
    heading: "Selling Tools",
    items: [
      { name: "Property Valuation" },
      { name: "Find an Agent" },
      { name: "Rates & Trends" },
      { name: "PropWorth" },
    ],
  },
];

const SellerDropdown = () => {
  return (
        <div className="nav-item dropdown position-static">
      <div className="container">

      <div className="row">
        {menusell.map((column, idx) => (
          <div className="col" key={idx}>
            <h6 className="dropdown-header m-0 ">{column.heading}</h6>
            <span className="dropdown-header-separator"></span>
            <ul className="list-unstyled mb-3">
              {column.items.map((item, i) => (
                <li className="dropdown-item mb-2" key={i}>
                  {item.name}
                  {item.badge && (
                    <span className="badge bg-warning text-dark ms-2">
                      {item.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {column.extraInfo && (
              <div className="text-muted  text-center small border-top pt-2">
                <p className="mb-1 dropdown-item">{column.extraInfo.title}</p>
                <p className="mb-0 dropdown-item">
                  {column.extraInfo.contact}
                  {column.extraInfo.email && (
                    <>
                      <a href={column.extraInfo.emailHref} className=" email-anchor ms-1 text-decoration-none ">
                        {column.extraInfo.email}
                      </a>
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>  
  );
};

export default SellerDropdown;
