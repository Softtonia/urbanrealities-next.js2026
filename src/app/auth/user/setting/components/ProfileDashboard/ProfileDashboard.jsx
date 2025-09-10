import styles from "./ProfileDashboard.module.css";
import Image from "next/image";
import { HiShieldCheck } from "react-icons/hi";
import { FiMoreVertical } from "react-icons/fi";
import { IoFolder } from "react-icons/io5";
import { BsImages } from "react-icons/bs";
import { IoDocumentsSharp } from "react-icons/io5";

const Dashboard = () => {
  return (
    <div className={styles.dashboardcontainer}>
      <div className={styles.dashboardsection}>
        {/* Left Sidebar */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.moreIcon}>
              <FiMoreVertical />
            </div>
            <div className={styles.profileImageContainer}>
              <Image
                src="/albert-camus.png"
                alt="Albert Camus"
                width={90}
                height={90}
                className={styles.profileImage}
              />
            </div>
            <h3 className={styles.profileName}>Albert Camus</h3>
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Age:</span>
              <span className={styles.value}>76</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Phone Number:</span>
              <span className={styles.value}>7789898576</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>example45@gmail.com</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>State:</span>
              <span className={styles.value}>Delhi</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Country:</span>
              <span className={styles.value}>India</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          {/* About Us Section */}
          <div className={styles.aboutUsSection}>
            <div className={styles.aboutUsheading}>
              <h3 className={styles.sectionTitle}>About Us</h3>
            </div>
            <div className={styles.bioText}>
              <strong>Bio:-</strong> Cumsan et ultricies a, laoreet eu tellus.
              Etiam porttitor, sem non feugiat pharetra, libero risus dictum
              lacus, eget sollicitudin est enim id libero. Nullam eget dolor
              accumsan, semper odio quis, iaculis leo. Vivamus vitae congue est.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Nam diam mi, congue vel
              suscipit a, convallis vitae metus. Duis condimentum lacus vel
              libero dignissi
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <p className={styles.infoIcon}>
                    <HiShieldCheck />
                    <span className={styles.infoLabel}>Agency</span>
                  </p>
                  <span className={styles.infoValue}>Indian Real Estate</span>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoIcon}>
                    <HiShieldCheck />
                    <span className={styles.infoLabel}>Agency</span>
                  </p>
                  <span className={styles.infoValue}>Indian Real Estate</span>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoIcon}>
                    <HiShieldCheck />
                    <span className={styles.infoLabel}>Agency</span>
                  </p>
                  <span className={styles.infoValue}>Indian Real Estate</span>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoIcon}>
                    <HiShieldCheck />
                    <span className={styles.infoLabel}>Agency</span>
                  </p>
                  <span className={styles.infoValue}>Indian Real Estate</span>
                </div>
              </div>
            </div>
          </div>
          {/* Properties Section */}
          <div className={styles.propertiesGrid}>
            <div className={styles.propertyCard}>
              <div className={styles.Barcontent}>
                <span className={styles.propertyCount}>58</span>
                <span className={styles.propertyLabel}>Properties Rent</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: "85%" }}
                ></div>
                <span className={styles.progressText}>85%</span>
              </div>
            </div>

            <div className={styles.propertyCard}>
              <div className={styles.Barcontent}>
                <span className={styles.propertyCount}>48</span>
                <span className={styles.propertyLabel}>Properties Sell</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: "70%" }}
                ></div>
                <span className={styles.progressText}>70%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>My Files</h4>
        <div className={styles.filesGrid}>
          <div className={styles.fileItem}>
            <div className={styles.filediv}><IoFolder className={styles.fileIcon} /></div>
            <div>
                <p className={styles.fileLabel}>My Folders</p>
                <span className={styles.fileDate}>Create on 24 Apr,2024</span>
            </div>
          </div>
          <div className={styles.fileItem}>
            <div className={styles.filediv}><BsImages className={styles.fileIcon} /></div>
            <div>
                <p className={styles.fileLabel}>Gallery</p>
                <span className={styles.fileDate}>Create on 24 Apr,2024</span>
            </div>
          </div>
          <div className={styles.fileItem}>
            <div className={styles.filediv}><IoDocumentsSharp className={styles.fileIcon} /></div>
            <div>
                <p className={styles.fileLabel}>Documents</p>
                <span className={styles.fileDate}>Create on 24 Apr,2024</span>
            </div>
          </div>
          <div className={` ${styles.fileItem} ${styles.createButtonContainer}`}>
            <button className={styles.createButton}>Create New Files</button>
          </div>
        </div>
      </div>

      {/* Other Files Section */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Other Files</h4>
        <div className={styles.otherFilesGrid}>
          {[...Array(15)].map((_, index) => (
            <div key={index} className={styles.otherFileItem}>
              <div className={styles.otherFileIcon}><IoFolder /></div>
              <span className={styles.otherFileLabel}>Folder</span>
              <div className={styles.folderIcon}><FiMoreVertical /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
