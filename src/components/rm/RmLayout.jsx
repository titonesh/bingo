// // File: src/components/rm/RmLayout.jsx
// import React, { useState } from "react";
// import { Menu } from "antd";
// import { BellOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
// // Using the same icons as CreatorSidebar
// import {
//   Inbox,
//   CheckCircle,
//   BarChart2,
//   Clock,
//   ClipboardList,
//   Settings,
// } from "lucide-react";

// // Import your RM components
// import MyQueue from "../../pages/rm/MyQueue";
// import Completed from "../../pages/rm/Completed";
// import ReportsPage from "../../pages/rm/Reports";
// import RmChecklistPage from "../../pages/rm/RmChecklistPage";
// import Navbar from "../Navbar";

// const Sidebar = ({
//   selectedKey,
//   setSelectedKey,
//   collapsed,
//   toggleCollapse,
// }) => {
//   const handleClick = (e) => {
//     console.log("Menu clicked:", e.key);
//     setSelectedKey(e.key);
//   };

//   return (
//     <div
//       style={{
//         width: collapsed ? 80 : 260,
//         background: "#3A2A82", // Changed to match Creator sidebar color
//         color: "white",
//         transition: "0.25s ease",
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
//         height: "100vh",
//       }}
//     >
//       <div
//         style={{
//           padding: collapsed ? "20px 0" : "25px 20px",
//           fontSize: collapsed ? 28 : 24,
//           fontWeight: "bold",
//           letterSpacing: collapsed ? 2 : 1,
//           textAlign: collapsed ? "center" : "left",
//         }}
//       >
//         {collapsed ? "RM" : "RM Dashboard"}
//       </div>

//       <Menu
//         theme="dark"
//         mode="inline"
//         selectedKeys={[selectedKey]}
//         onClick={handleClick}
//         style={{ background: "transparent", borderRight: "none", fontSize: 15 }}
//         inlineCollapsed={collapsed}
//         items={[
//           // {
//           //   key: "allchecklits",
//           //   label: "All Checklists",
//           //   icon: <Inbox size={16} style={{ color: "#e5e7eb" }} />, // Same as Creator
//           // },
//           {
//             key: "myqueue",
//             label: "My Queue",
//             icon: <ClipboardList size={20} style={{ color: "#e5e7eb" }} />,
//           },
//           {
//             key: "completed",
//             label: "Completed",
//             icon: <CheckCircle size={16} style={{ color: "#e5e7eb" }} />, // Same as Creator
//           },
//           {
//             key: "deferral",
//             label: "Deferrals",
//             icon: <Clock size={16} style={{ color: "#e5e7eb" }} />, // Same as Creator
//             children: [
//               { key: "pendingdeferral", label: "Pending Deferral" },
//               { key: "requestdeferral", label: "Request Deferral" },
//             ],
//           },
//           {
//             key: "reports",
//             label: "Reports",
//             icon: <BarChart2 size={16} style={{ color: "#e5e7eb" }} />, // Same as Creator
//           },
//         ]}
//       />

//       <div style={{ marginTop: "auto", padding: 20, textAlign: "center" }}>
//         <button
//           onClick={toggleCollapse}
//           style={{
//             width: "100%",
//             padding: "8px 0",
//             borderRadius: 6,
//             border: "none",
//             background: "#fff",
//             color: "#3A2A82", // Updated to match new sidebar color
//             fontWeight: 600,
//             cursor: "pointer",
//             transition: "0.2s",
//           }}
//         >
//           {collapsed ? "Expand" : "Collapse"}
//         </button>
//       </div>
//     </div>
//   );
// };

// <Navbar />;

// const RmLayout = ({ userId, rmId }) => {
//   const [selectedKey, setSelectedKey] = useState("myqueue");
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

//   const renderContent = () => {
//     console.log("Rendering RM content for:", selectedKey);
//     console.log("User ID:", userId || "rm_current");

//     try {
//       switch (selectedKey) {
//         case "myqueue":
//           return <MyQueue userId={userId || "rm_current"} />;

//         case "completed":
//           return <Completed userId={userId || "rm_current"} />;

//         // case "allchecklits":
//         //   return <RmChecklistPage userId={userId || "rm_current"} />;

//         case "pendingdeferral":
//           return <div style={pageStyle}>Pending Deferral Page</div>;

//         case "requestdeferral":
//           return <div style={pageStyle}>Request Deferral Page</div>;

//         case "reports":
//           return <ReportsPage userId={userId || "rm_current"} />;

//         default:
//           return <MyQueue userId={userId || "rm_current"} />;
//       }
//     } catch (error) {
//       console.error("Error rendering content:", error);
//       return (
//         <div style={{ padding: 25 }}>
//           <div
//             style={{
//               backgroundColor: "#fff2f0",
//               padding: 20,
//               borderRadius: 8,
//               border: "1px solid #ffccc7",
//             }}
//           >
//             <h3 style={{ color: "#ff4d4f" }}>Error Loading Page</h3>
//             <p>{error.message}</p>
//             <button
//               onClick={() => window.location.reload()}
//               style={{
//                 marginTop: 10,
//                 padding: "8px 16px",
//                 backgroundColor: "#3A2A82", // Updated color
//                 color: "white",
//                 border: "none",
//                 borderRadius: 4,
//                 cursor: "pointer",
//               }}
//             >
//               Reload Page
//             </button>
//           </div>
//         </div>
//       );
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         overflow: "hidden",
//         background: "#f0f2f5",
//       }}
//     >
//       <Sidebar
//         selectedKey={selectedKey}
//         setSelectedKey={setSelectedKey}
//         collapsed={sidebarCollapsed}
//         toggleCollapse={toggleSidebar}
//       />
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <Navbar toggleSidebar={toggleSidebar} />
//         <div
//           style={{
//             padding: "25px",
//             flex: 1,
//             overflowY: "auto",
//             background: "#f0f2f5",
//           }}
//         >
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* Shared Page Style */
// const pageStyle = {
//   fontSize: 28,
//   fontWeight: "bold",
//   color: "#3A2A82",
// };

// export default RmLayout;









// File: src/components/rm/RmLayout.jsx
import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import {
  CheckCircle,
  BarChart2,
  Clock,
  ClipboardList,
  FileText,
  ListChecks,
} from "lucide-react";

// Import your RM components
import MyQueue from "../../pages/rm/MyQueue";
import Completed from "../../pages/rm/Completed";
import ReportsPage from "../../pages/rm/Reports";
import Navbar from "../Navbar";

// Import Deferral Components
import DeferralForm from "../../pages/deferrals/DeferralForm";
import DeferralPending from "../../pages/deferrals/DeferralPending";

const Sidebar = ({
  selectedKey,
  setSelectedKey,
  collapsed,
  toggleCollapse,
  navigate,
}) => {
  const location = useLocation();
  
  const handleClick = (e) => {
    console.log("Menu clicked:", e.key);
    
    // Handle deferral routes
    if (e.key === "requestdeferral") {
      navigate("/rm/deferrals/request");
      return;
    }
    if (e.key === "pendingdeferral") {
      navigate("/rm/deferrals/pending");
      return;
    }
    
    // Handle other routes
    if (e.key === "deferral") {
      navigate("/rm/deferrals/request");
      return;
    }
    
    setSelectedKey(e.key);
    navigate(`/rm/${e.key}`);
  };

  // Determine selected key from path
  const getSelectedKeyFromPath = () => {
    const path = location.pathname;
    if (path.includes("/rm/deferrals/request")) return "requestdeferral";
    if (path.includes("/rm/deferrals/pending")) return "pendingdeferral";
    if (path.includes("/rm/myqueue")) return "myqueue";
    if (path.includes("/rm/completed")) return "completed";
    if (path.includes("/rm/reports")) return "reports";
    return selectedKey;
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 260,
        background: "#3A2A82",
        color: "white",
        transition: "0.25s ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: collapsed ? "20px 0" : "25px 20px",
          fontSize: collapsed ? 28 : 24,
          fontWeight: "bold",
          letterSpacing: collapsed ? 2 : 1,
          textAlign: collapsed ? "center" : "left",
        }}
      >
        {collapsed ? "RM" : "RM Dashboard"}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKeyFromPath()]}
        onClick={handleClick}
        style={{ background: "transparent", borderRight: "none", fontSize: 15 }}
        inlineCollapsed={collapsed}
        items={[
          {
            key: "myqueue",
            label: "My Queue",
            icon: <ClipboardList size={20} style={{ color: "#e5e7eb" }} />,
          },
          {
            key: "completed",
            label: "Completed",
            icon: <CheckCircle size={16} style={{ color: "#e5e7eb" }} />,
          },
          {
            key: "deferral",
            label: "Deferrals",
            icon: <Clock size={16} style={{ color: "#e5e7eb" }} />,
            children: [
              {
                key: "requestdeferral",
                label: "Request Deferral",
                icon: <FileText size={14} style={{ color: "#e5e7eb" }} />,
              },
              {
                key: "pendingdeferral",
                label: "Pending Deferral",
                icon: <ListChecks size={14} style={{ color: "#e5e7eb" }} />,
              },
              
            ],
          },
          {
            key: "reports",
            label: "Reports",
            icon: <BarChart2 size={16} style={{ color: "#e5e7eb" }} />,
          },
        ]}
      />

      <div style={{ marginTop: "auto", padding: 20, textAlign: "center" }}>
        <button
          onClick={toggleCollapse}
          style={{
            width: "100%",
            padding: "8px 0",
            borderRadius: 6,
            border: "none",
            background: "#fff",
            color: "#3A2A82",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

const RmLayout = ({ userId, rmId }) => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("myqueue");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  // Function to render content based on route
  const renderContent = () => {
    const path = location.pathname;
    
    console.log("Current path:", path);
    console.log("User ID:", userId || "rm_current");

    try {
      // Handle deferral routes
      if (path.includes("/rm/deferrals/request")) {
        return <DeferralForm userId={userId || "rm_current"} />;
      }
      
      if (path.includes("/rm/deferrals/pending")) {
        return <DeferralPending userId={userId || "rm_current"} />;
      }

      // Handle other main menu items
      if (path.includes("/rm/myqueue")) {
        return <MyQueue userId={userId || "rm_current"} />;
      }
      
      if (path.includes("/rm/completed")) {
        return <Completed userId={userId || "rm_current"} />;
      }
      
      if (path.includes("/rm/reports")) {
        return <ReportsPage userId={userId || "rm_current"} />;
      }

      // Default to My Queue
      return <MyQueue userId={userId || "rm_current"} />;
      
    } catch (error) {
      console.error("Error rendering content:", error);
      return (
        <div style={{ padding: 25 }}>
          <div
            style={{
              backgroundColor: "#fff2f0",
              padding: 20,
              borderRadius: 8,
              border: "1px solid #ffccc7",
            }}
          >
            <h3 style={{ color: "#ff4d4f" }}>Error Loading Page</h3>
            <p>{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: 10,
                padding: "8px 16px",
                backgroundColor: "#3A2A82",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#f0f2f5",
      }}
    >
      <Sidebar
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
        navigate={navigate}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div
          style={{
            padding: "25px",
            flex: 1,
            overflowY: "auto",
            background: "#f0f2f5",
          }}
        >
          <Routes>
            {/* Main RM Routes */}
            <Route path="/" element={<MyQueue userId={userId || "rm_current"} />} />
            <Route path="/myqueue" element={<MyQueue userId={userId || "rm_current"} />} />
            <Route path="/completed" element={<Completed userId={userId || "rm_current"} />} />
            <Route path="/reports" element={<ReportsPage userId={userId || "rm_current"} />} />
            
            {/* Deferral Routes */}
            <Route path="/deferrals">
              <Route path="request" element={<DeferralForm userId={userId || "rm_current"} />} />
              <Route path="pending" element={<DeferralPending userId={userId || "rm_current"} />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default RmLayout;