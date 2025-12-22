// import React, { useMemo, useState, useEffect } from "react";
// import {
//   Button,
//   Divider,
//   Table,
//   Tag,
//   Spin,
//   Empty,
//   Card,
//   Row,
//   Col,
//   Input,
//   Badge,
//   Typography,
//   Modal,
//   Form,
//   Input as AntInput,
//   DatePicker,
//   message
// } from "antd";
// import {
//   SearchOutlined,
//   FileTextOutlined,
//   UserOutlined,
//   CustomerServiceOutlined,
//   ClockCircleOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   EyeOutlined,
//   CalendarOutlined
// } from "@ant-design/icons";
// import dayjs from "dayjs";

// // Theme Colors (same as other queues)
// const PRIMARY_BLUE = "#164679";
// const ACCENT_LIME = "#b5d334";
// const HIGHLIGHT_GOLD = "#fcb116";
// const LIGHT_YELLOW = "#fcd716";
// const SECONDARY_PURPLE = "#7e6496";
// const SUCCESS_GREEN = "#52c41a";
// const ERROR_RED = "#ff4d4f";
// const WARNING_ORANGE = "#faad14";

// const { Text, Title } = Typography;
// const { TextArea } = AntInput;

// // MOCK DATA for Deferral Pending Queue
// const MOCK_PENDING_DEFERRALS = [
//   {
//     _id: "1",
//     deferralNumber: "DEF-2024-001",
//     dclNo: "DCL-2024-015",
//     customerNumber: "CUST001",
//     customerName: "Javan Dave",
//     businessName: "JAVAN DAVE AND SONS",
//     deferralTitle: "Bank Statements",
//     documentType: "Financial Statements",
//     deferralType: "New",
//     status: "pending_creator_review",
//     daysSought: 30,
//     requestedExpiry: "2025-02-05T23:59:59Z",
//     originalDueDate: "2025-01-05T23:59:59Z",
//     currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
//     previousApprovers: [
//       { _id: "creator2", name: "Pascal Kariuki", email: "pascal.k@ncba.co.ke" },
//       { _id: "creator3", name: "Emmanuel Nzeki", email: "emmanuel.n@ncba.co.ke" }
//     ],
//     rmRequestedBy: { _id: "rm1", name: "John Kamau", email: "john.k@ncba.co.ke" },
//     rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024",
//     createdAt: "2025-01-05T09:30:00Z",
//     updatedAt: "2025-01-05T09:30:00Z",
//     slaExpiry: "2025-01-12T23:59:59Z"
//   },
//   {
//     _id: "2",
//     deferralNumber: "DEF-2024-002",
//     dclNo: "DCL-2024-028",
//     customerNumber: "CUST002",
//     customerName: "Diana Mwangi",
//     businessName: "DIANA MWANGI AND DAUGHTERS",
//     deferralTitle: "CR12 Certificate",
//     documentType: "Registration Documents",
//     deferralType: "Extension",
//     status: "pending_creator_review",
//     daysSought: 15,
//     requestedExpiry: "2025-02-05T23:59:59Z",
//     originalDueDate: "2025-01-20T23:59:59Z",
//     currentApprover: { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
//     previousApprovers: [
//       { _id: "creator5", name: "Shallot Maala", email: "shallot.m@ncba.co.ke" }
//     ],
//     rmRequestedBy: { _id: "rm2", name: "Sarah Wangui", email: "sarah.w@ncba.co.ke" },
//     rmReason: "CRB office experiencing delays in processing due to system upgrades",
//     createdAt: "2025-01-11T14:20:00Z",
//     updatedAt: "2025-01-11T14:20:00Z",
//     slaExpiry: "2025-01-18T23:59:59Z"
//   },
//   {
//     _id: "3",
//     deferralNumber: "DEF-2024-003",
//     dclNo: "DCL-2024-042",
//     customerNumber: "CUST003",
//     customerName: "Lucy Nyambura",
//     businessName: "LUCY NYAMBURA AND SONS",
//     deferralTitle: "Lease Agreement",
//     documentType: "Legal Documents",
//     deferralType: "New",
//     status: "pending_creator_review",
//     daysSought: 45,
//     requestedExpiry: "2025-03-05T23:59:59Z",
//     originalDueDate: "2025-01-20T23:59:59Z",
//     currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
//     previousApprovers: [
//       { _id: "creator2", name: "Pascal Kariuki", email: "pascal.k@ncba.co.ke" },
//       { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" }
//     ],
//     rmRequestedBy: { _id: "rm3", name: "David Omondi", email: "david.o@ncba.co.ke" },
//     rmReason: "Landlord traveling overseas, agreement pending signature upon return",
//     createdAt: "2025-01-20T11:15:00Z",
//     updatedAt: "2025-01-20T11:15:00Z",
//     slaExpiry: "2025-01-27T23:59:59Z"
//   }
// ];

// // Deferral Review Modal Component
// const DeferralReviewModal = ({ deferral, open, onClose, onDecision }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [decision, setDecision] = useState(null);

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       await onDecision({
//         decision: values.decision,
//         comments: values.comments,
//         finalExpiryDate: values.finalExpiryDate
//       });
//       message.success(`Deferral ${values.decision === 'accept' ? 'accepted' : 'rejected'} successfully`);
//       onClose();
//     } catch (error) {
//       message.error('Failed to process decision');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       title={<span style={{ color: PRIMARY_BLUE }}>Review Deferral Request</span>}
//       open={open}
//       onCancel={onClose}
//       width={800}
//       footer={null}
//     >
//       {deferral && (
//         <div>
//           {/* Header Section */}
//           <Card
//             size="small"
//             style={{ marginBottom: 16, borderLeft: `4px solid ${ACCENT_LIME}` }}
//           >
//             <Row gutter={[16, 16]}>
//               <Col span={12}>
//                 <Text strong>Deferral Number:</Text>
//                 <div style={{ color: PRIMARY_BLUE, fontWeight: 'bold' }}>
//                   {deferral.deferralNumber}
//                 </div>
//               </Col>
//               <Col span={12}>
//                 <Text strong>DCL Number:</Text>
//                 <div>{deferral.dclNo}</div>
//               </Col>
//               <Col span={12}>
//                 <Text strong>Customer:</Text>
//                 <div>{deferral.customerName}</div>
//                 <Text type="secondary" style={{ fontSize: 12 }}>
//                   {deferral.businessName}
//                 </Text>
//               </Col>
//               <Col span={12}>
//                 <Text strong>Document:</Text>
//                 <div>{deferral.deferralTitle}</div>
//                 <Tag color="blue" style={{ marginTop: 4 }}>{deferral.documentType}</Tag>
//               </Col>
//             </Row>
//           </Card>

//           {/* Timeline Section */}
//           <Card size="small" style={{ marginBottom: 16 }}>
//             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
//               <ClockCircleOutlined /> Timeline
//             </Title>
//             <Row gutter={[16, 16]}>
//               <Col span={8}>
//                 <div>
//                   <Text type="secondary" style={{ fontSize: 12 }}>Original Due Date</Text>
//                   <div style={{ fontWeight: 'bold' }}>
//                     {dayjs(deferral.originalDueDate).format('DD/MM/YYYY')}
//                   </div>
//                 </div>
//               </Col>
//               <Col span={8}>
//                 <div>
//                   <Text type="secondary" style={{ fontSize: 12 }}>Requested Extension</Text>
//                   <div style={{ fontWeight: 'bold', color: WARNING_ORANGE }}>
//                     {dayjs(deferral.requestedExpiry).format('DD/MM/YYYY')}
//                   </div>
//                   <Text type="secondary" style={{ fontSize: 11 }}>
//                     ({deferral.daysSought} days)
//                   </Text>
//                 </div>
//               </Col>
//               <Col span={8}>
//                 <div>
//                   <Text type="secondary" style={{ fontSize: 12 }}>SLA Expiry</Text>
//                   <div style={{ fontWeight: 'bold', color: ERROR_RED }}>
//                     {dayjs(deferral.slaExpiry).format('DD/MM/YYYY')}
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </Card>

//           {/* Reason Section */}
//           <Card size="small" style={{ marginBottom: 16 }}>
//             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
//               <UserOutlined /> RM's Request Reason
//             </Title>
//             <div style={{
//               padding: 12,
//               background: '#f8f9fa',
//               borderRadius: 4,
//               borderLeft: `3px solid ${SECONDARY_PURPLE}`
//             }}>
//               {deferral.rmReason}
//             </div>
//             <div style={{ marginTop: 8, fontSize: 12 }}>
//               <Text type="secondary">
//                 Requested by: {deferral.rmRequestedBy?.name} ({deferral.rmRequestedBy?.email})
//               </Text>
//             </div>
//           </Card>

//           {/* Approval History */}
//           <Card size="small" style={{ marginBottom: 16 }}>
//             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
//               Approval History
//             </Title>
//             {deferral.previousApprovers.map((approver, index) => (
//               <div key={index} style={{ marginBottom: 8, padding: 8, background: '#f8f9fa' }}>
//                 <Text strong>{approver.name}</Text>
//                 <Text type="secondary" style={{ marginLeft: 8 }}>{approver.email}</Text>
//               </div>
//             ))}
//           </Card>

//           {/* Decision Form */}
//           <Form form={form} layout="vertical" onFinish={handleSubmit}>
//             <Card size="small">
//               <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
//                 Your Decision
//               </Title>
              
//               <Form.Item
//                 name="decision"
//                 label="Decision"
//                 rules={[{ required: true, message: 'Please select a decision' }]}
//               >
//                 <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
//                   <Button
//                     type={decision === 'accept' ? 'primary' : 'default'}
//                     style={{
//                       background: decision === 'accept' ? SUCCESS_GREEN : undefined,
//                       borderColor: SUCCESS_GREEN,
//                       color: decision === 'accept' ? 'white' : SUCCESS_GREEN
//                     }}
//                     onClick={() => {
//                       setDecision('accept');
//                       form.setFieldValue('decision', 'accept');
//                     }}
//                     icon={<CheckCircleOutlined />}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     type={decision === 'reject' ? 'primary' : 'default'}
//                     style={{
//                       background: decision === 'reject' ? ERROR_RED : undefined,
//                       borderColor: ERROR_RED,
//                       color: decision === 'reject' ? 'white' : ERROR_RED
//                     }}
//                     onClick={() => {
//                       setDecision('reject');
//                       form.setFieldValue('decision', 'reject');
//                     }}
//                     icon={<CloseCircleOutlined />}
//                   >
//                     Reject
//                   </Button>
//                 </div>
//               </Form.Item>

//               {decision === 'accept' && (
//                 <Form.Item
//                   name="finalExpiryDate"
//                   label="Final Expiry Date"
//                   rules={[{ required: true, message: 'Please select final expiry date' }]}
//                 >
//                   <DatePicker
//                     style={{ width: '100%' }}
//                     disabledDate={(current) => current && current < dayjs(deferral.originalDueDate)}
//                     suffixIcon={<CalendarOutlined />}
//                   />
//                 </Form.Item>
//               )}

//               <Form.Item
//                 name="comments"
//                 label="Comments"
//                 rules={[{ required: true, message: 'Please provide comments for your decision' }]}
//               >
//                 <TextArea
//                   rows={3}
//                   placeholder="Enter your comments here..."
//                   maxLength={500}
//                   showCount
//                 />
//               </Form.Item>

//               <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
//                 <Button onClick={onClose}>Cancel</Button>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   loading={loading}
//                   style={{
//                     background: decision === 'accept' ? SUCCESS_GREEN : ERROR_RED,
//                     borderColor: decision === 'accept' ? SUCCESS_GREEN : ERROR_RED
//                   }}
//                 >
//                   {decision === 'accept' ? 'Approve Deferral' : 'Reject Deferral'}
//                 </Button>
//               </div>
//             </Card>
//           </Form>
//         </div>
//       )}
//     </Modal>
//   );
// };

// // Main DeferralPending Component
// const DeferralPending = ({ userId = "creator_current" }) => {
//   const [selectedDeferral, setSelectedDeferral] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [mockData, setMockData] = useState([]);
  
//   // Filters
//   const [searchText, setSearchText] = useState("");

//   // Load data
//   useEffect(() => {
//     setLoading(true);
    
//     setTimeout(() => {
//       setMockData(MOCK_PENDING_DEFERRALS);
//       setLoading(false);
//     }, 300);
//   }, []);

//   // Filter data
//   const filteredData = useMemo(() => {
//     let filtered = mockData.filter((d) => d.status === "pending_creator_review");
    
//     // Apply search filter
//     if (searchText) {
//       filtered = filtered.filter(d =>
//         d.deferralNumber.toLowerCase().includes(searchText.toLowerCase()) ||
//         d.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
//         d.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
//         d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
//         d.businessName.toLowerCase().includes(searchText.toLowerCase()) ||
//         d.deferralTitle.toLowerCase().includes(searchText.toLowerCase())
//       );
//     }
    
//     return filtered;
//   }, [mockData, searchText]);

//   // Handle decision
//   const handleDecision = async (decisionData) => {
//     setLoading(true);
//     setTimeout(() => {
//       setMockData(prev => prev.filter(d => d._id !== selectedDeferral._id));
//       setLoading(false);
//       setModalOpen(false);
//       setSelectedDeferral(null);
      
//       // Show success message
//       message.success(
//         decisionData.decision === 'accept' 
//           ? 'Deferral accepted successfully' 
//           : 'Deferral rejected successfully'
//       );
//     }, 500);
//   };

//   // Clear filters
//   const clearFilters = () => {
//     setSearchText("");
//   };

//   // Columns
//   const columns = [
//     {
//       title: "Deferral No",
//       dataIndex: "deferralNumber",
//       width: 140,
//       render: (text) => (
//         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
//           <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
//           {text}
//         </div>
//       )
//     },
//     {
//       title: "DCL No",
//       dataIndex: "dclNo",
//       width: 120,
//       render: (text) => (
//         <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
//           {text}
//         </div>
//       )
//     },
//     {
//       title: "Customer",
//       dataIndex: "customerName",
//       width: 180,
//       render: (text, record) => (
//         <div style={{
//           fontWeight: 600,
//           color: PRIMARY_BLUE,
//           display: "flex",
//           alignItems: "center",
//           gap: 6
//         }}>
//           <CustomerServiceOutlined style={{ fontSize: 12 }} />
//           <div>
//             <div>{text}</div>
//             <div style={{ fontSize: 11, color: "#666" }}>
//               {record.businessName}
//             </div>
//           </div>
//         </div>
//       )
//     },
//     {
//       title: "Document",
//       dataIndex: "deferralTitle",
//       width: 160,
//       render: (text, record) => (
//         <div>
//           <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
//             {text}
//           </div>
//           <div style={{ fontSize: 11, color: "#999" }}>
//             {record.documentType}
//           </div>
//         </div>
//       )
//     },
//     {
//       title: "Type",
//       dataIndex: "deferralType",
//       width: 100,
//       render: (type) => (
//         <Tag
//           color={type === "New" ? "blue" : "orange"}
//           style={{
//             fontSize: 11,
//             fontWeight: "bold",
//             borderRadius: 4,
//             minWidth: 70,
//             textAlign: "center"
//           }}
//         >
//           {type}
//         </Tag>
//       )
//     },
//     {
//       title: "Days Sought",
//       dataIndex: "daysSought",
//       width: 90,
//       align: "center",
//       render: (days) => (
//         <div style={{
//           fontWeight: "bold",
//           color: days > 30 ? ERROR_RED : WARNING_ORANGE,
//           fontSize: 14
//         }}>
//           {days}d
//         </div>
//       )
//     },
//     {
//       title: "Requested By",
//       dataIndex: "rmRequestedBy",
//       width: 130,
//       render: (rm) => (
//         <div style={{ fontSize: 12 }}>
//           <div style={{ fontWeight: 500 }}>{rm?.name}</div>
//           <div style={{ color: "#666", fontSize: 11 }}>RM</div>
//         </div>
//       )
//     },
//     {
//       title: "SLA",
//       dataIndex: "slaExpiry",
//       width: 90,
//       fixed: "right",
//       render: (date) => {
//         const daysLeft = dayjs(date).diff(dayjs(), 'days');
//         return (
//           <Tag
//             color={daysLeft <= 1 ? ERROR_RED : daysLeft <= 3 ? WARNING_ORANGE : SUCCESS_GREEN}
//             style={{ fontWeight: "bold", fontSize: 11 }}
//           >
//             {daysLeft > 0 ? `${daysLeft}d` : 'Expired'}
//           </Tag>
//         );
//       }
//     }
//   ];

//   // Custom table styles
//   const customTableStyles = `
//     .deferral-pending-table .ant-table-wrapper {
//       border-radius: 12px;
//       overflow: hidden;
//       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
//       border: 1px solid #e0e0e0;
//     }
//     .deferral-pending-table .ant-table-thead > tr > th {
//       background-color: #f7f7f7 !important;
//       color: ${PRIMARY_BLUE} !important;
//       font-weight: 700;
//       fontSize: 13px;
//       padding: 14px 12px !important;
//       border-bottom: 3px solid ${ACCENT_LIME} !important;
//       border-right: none !important;
//     }
//     .deferral-pending-table .ant-table-tbody > tr > td {
//       border-bottom: 1px solid #f0f0f0 !important;
//       border-right: none !important;
//       padding: 12px 12px !important;
//       fontSize: 13px;
//       color: #333;
//     }
//     .deferral-pending-table .ant-table-tbody > tr.ant-table-row:hover > td {
//       background-color: rgba(181, 211, 52, 0.1) !important;
//       cursor: pointer;
//     }
//     .deferral-pending-table .ant-pagination .ant-pagination-item-active {
//       background-color: ${ACCENT_LIME} !important;
//       border-color: ${ACCENT_LIME} !important;
//     }
//     .deferral-pending-table .ant-pagination .ant-pagination-item-active a {
//       color: ${PRIMARY_BLUE} !important;
//       font-weight: 600;
//     }
//   `;

//   return (
//     <div style={{ padding: 24 }}>
//       <style>{customTableStyles}</style>

//       {/* Header */}
//       <Card
//         style={{
//           marginBottom: 24,
//           borderRadius: 8,
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           borderLeft: `4px solid ${ACCENT_LIME}`
//         }}
//         bodyStyle={{ padding: 16 }}
//       >
//         <Row justify="space-between" align="middle">
//           <Col>
//             <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
//               Pending Deferrals
//               <Badge
//                 count={filteredData.length}
//                 style={{
//                   backgroundColor: ACCENT_LIME,
//                   fontSize: 12
//                 }}
//               />
//             </h2>
//             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
//               Review and approve/reject deferral requests from Relationship Managers
//             </p>
//           </Col>
//         </Row>
//       </Card>

//       {/* Filters */}
//       <Card
//         style={{
//           marginBottom: 16,
//           background: "#fafafa",
//           border: `1px solid ${PRIMARY_BLUE}20`,
//           borderRadius: 8
//         }}
//         size="small"
//       >
//         <Row gutter={[16, 16]} align="middle">
//           <Col xs={24} sm={12} md={8}>
//             <Input
//               placeholder="Search by Deferral No, DCL No, Customer, or Document"
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               allowClear
//               size="middle"
//             />
//           </Col>
          
//           <Col xs={24} sm={12} md={4}>
//             <Button
//               onClick={clearFilters}
//               style={{ width: '100%' }}
//               size="middle"
//             >
//               Clear Filters
//             </Button>
//           </Col>
//         </Row>
//       </Card>

//       {/* Table Title */}
//       <Divider style={{ margin: "12px 0" }}>
//         <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
//           Pending Deferral Review ({filteredData.length} items)
//         </span>
//       </Divider>

//       {/* Table */}
//       {loading ? (
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
//           <Spin tip="Loading deferral requests..." />
//         </div>
//       ) : filteredData.length === 0 ? (
//         <Empty
//           description={
//             <div>
//               <p style={{ fontSize: 16, marginBottom: 8 }}>No pending deferral requests</p>
//               <p style={{ color: "#999" }}>
//                 {searchText
//                   ? 'Try changing your search term'
//                   : 'All deferral requests have been processed'}
//               </p>
//             </div>
//           }
//           style={{ padding: 40 }}
//         />
//       ) : (
//         <div className="deferral-pending-table">
//           <Table
//             columns={columns}
//             dataSource={filteredData}
//             rowKey="_id"
//             size="middle"
//             pagination={{
//               pageSize: 10,
//               showSizeChanger: true,
//               pageSizeOptions: ["10", "20", "50"],
//               position: ["bottomCenter"],
//               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} deferrals`
//             }}
//             scroll={{ x: 1200 }}
//             onRow={(record) => ({
//               onClick: () => {
//                 setSelectedDeferral(record);
//                 setModalOpen(true);
//               },
//             })}
//           />
//         </div>
//       )}

//       {/* Footer Info */}
//       <div style={{
//         marginTop: 24,
//         padding: 16,
//         background: "#f8f9fa",
//         borderRadius: 8,
//         fontSize: 12,
//         color: "#666",
//         border: `1px solid ${PRIMARY_BLUE}10`
//       }}>
//         <Row justify="space-between" align="middle">
//           <Col>
//             Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
//           </Col>
//           <Col>
//             <Text type="secondary">
//               Showing {filteredData.length} items • Data as of latest system update
//             </Text>
//           </Col>
//         </Row>
//       </div>

//       {/* Deferral Review Modal */}
//       {selectedDeferral && (
//         <DeferralReviewModal
//           deferral={selectedDeferral}
//           open={modalOpen}
//           onClose={() => {
//             setModalOpen(false);
//             setSelectedDeferral(null);
//           }}
//           onDecision={handleDecision}
//         />
//       )}
//     </div>
//   );
// };

// export default DeferralPending;




import React, { useMemo, useState, useEffect } from "react";
import {
  Button,
  Divider,
  Table,
  Tag,
  Spin,
  Empty,
  Card,
  Row,
  Col,
  Input,
  Badge,
  Typography,
  Modal,
  Form,
  Input as AntInput,
  DatePicker,
  message
} from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

// Theme Colors (same as other queues)
const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";
const HIGHLIGHT_GOLD = "#fcb116";
const LIGHT_YELLOW = "#fcd716";
const SECONDARY_PURPLE = "#7e6496";
const SUCCESS_GREEN = "#52c41a";
const ERROR_RED = "#ff4d4f";
const WARNING_ORANGE = "#faad14";

const { Text, Title } = Typography;
const { TextArea } = AntInput;

// MOCK DATA for Deferral Pending Queue
const MOCK_PENDING_DEFERRALS = [
  {
    _id: "1",
    deferralNumber: "DEF-2024-001",
    dclNo: "DCL-2024-015",
    customerNumber: "CUST001",
    customerName: "Javan Dave",
    businessName: "JAVAN DAVE AND SONS",
    deferralTitle: "Bank Statements",
    documentType: "Financial Statements",
    deferralType: "New",
    status: "pending_creator_review",
    daysSought: 30,
    requestedExpiry: "2025-02-05T23:59:59Z",
    originalDueDate: "2025-01-05T23:59:59Z",
    currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
    previousApprovers: [
      { _id: "creator2", name: "Pascal Kariuki", email: "pascal.k@ncba.co.ke" },
      { _id: "creator3", name: "Emmanuel Nzeki", email: "emmanuel.n@ncba.co.ke" }
    ],
    rmRequestedBy: { _id: "rm1", name: "John Kamau", email: "john.k@ncba.co.ke" },
    rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024",
    createdAt: "2025-01-05T09:30:00Z",
    updatedAt: "2025-01-05T09:30:00Z",
    slaExpiry: "2025-01-12T23:59:59Z"
  },
  {
    _id: "2",
    deferralNumber: "DEF-2024-002",
    dclNo: "DCL-2024-028",
    customerNumber: "CUST002",
    customerName: "Diana Mwangi",
    businessName: "DIANA MWANGI AND DAUGHTERS",
    deferralTitle: "CR12 Certificate",
    documentType: "Registration Documents",
    deferralType: "Extension",
    status: "pending_creator_review",
    daysSought: 15,
    requestedExpiry: "2025-02-05T23:59:59Z",
    originalDueDate: "2025-01-20T23:59:59Z",
    currentApprover: { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
    previousApprovers: [
      { _id: "creator5", name: "Shallot Maala", email: "shallot.m@ncba.co.ke" }
    ],
    rmRequestedBy: { _id: "rm2", name: "Sarah Wangui", email: "sarah.w@ncba.co.ke" },
    rmReason: "CRB office experiencing delays in processing due to system upgrades",
    createdAt: "2025-01-11T14:20:00Z",
    updatedAt: "2025-01-11T14:20:00Z",
    slaExpiry: "2025-01-18T23:59:59Z"
  },
  {
    _id: "3",
    deferralNumber: "DEF-2024-003",
    dclNo: "DCL-2024-042",
    customerNumber: "CUST003",
    customerName: "Lucy Nyambura",
    businessName: "LUCY NYAMBURA AND SONS",
    deferralTitle: "Lease Agreement",
    documentType: "Legal Documents",
    deferralType: "New",
    status: "pending_creator_review",
    daysSought: 45,
    requestedExpiry: "2025-03-05T23:59:59Z",
    originalDueDate: "2025-01-20T23:59:59Z",
    currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
    previousApprovers: [
      { _id: "creator2", name: "Pascal Kariuki", email: "pascal.k@ncba.co.ke" },
      { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" }
    ],
    rmRequestedBy: { _id: "rm3", name: "David Omondi", email: "david.o@ncba.co.ke" },
    rmReason: "Landlord traveling overseas, agreement pending signature upon return",
    createdAt: "2025-01-20T11:15:00Z",
    updatedAt: "2025-01-20T11:15:00Z",
    slaExpiry: "2025-01-27T23:59:59Z"
  }
];

// Deferral Review Modal Component
const DeferralReviewModal = ({ deferral, open, onClose, onDecision }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [decision, setDecision] = useState(null);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await onDecision({
        decision: values.decision,
        comments: values.comments,
        finalExpiryDate: values.finalExpiryDate
      });
      message.success(`Deferral ${values.decision === 'accept' ? 'accepted' : 'rejected'} successfully`);
      onClose();
    } catch (error) {
      message.error('Failed to process decision');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<span style={{ color: PRIMARY_BLUE }}>Review Deferral Request</span>}
      open={open}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      {deferral && (
        <div>
          {/* Header Section */}
          <Card
            size="small"
            style={{ marginBottom: 16, borderLeft: `4px solid ${ACCENT_LIME}` }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Deferral Number:</Text>
                <div style={{ color: PRIMARY_BLUE, fontWeight: 'bold' }}>
                  {deferral.deferralNumber}
                </div>
              </Col>
              <Col span={12}>
                <Text strong>DCL Number:</Text>
                <div>{deferral.dclNo}</div>
              </Col>
              <Col span={12}>
                <Text strong>Customer:</Text>
                <div>{deferral.customerName}</div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {deferral.businessName}
                </Text>
              </Col>
              <Col span={12}>
                <Text strong>Document:</Text>
                <div>{deferral.deferralTitle}</div>
                <Tag color="blue" style={{ marginTop: 4 }}>{deferral.documentType}</Tag>
              </Col>
            </Row>
          </Card>

          {/* Timeline Section */}
          <Card size="small" style={{ marginBottom: 16 }}>
            <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
              <ClockCircleOutlined /> Timeline
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Original Due Date</Text>
                  <div style={{ fontWeight: 'bold' }}>
                    {dayjs(deferral.originalDueDate).format('DD/MM/YYYY')}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Requested Extension</Text>
                  <div style={{ fontWeight: 'bold', color: WARNING_ORANGE }}>
                    {dayjs(deferral.requestedExpiry).format('DD/MM/YYYY')}
                  </div>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    ({deferral.daysSought} days)
                  </Text>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>SLA Expiry</Text>
                  <div style={{ fontWeight: 'bold', color: ERROR_RED }}>
                    {dayjs(deferral.slaExpiry).format('DD/MM/YYYY')}
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Reason Section */}
          <Card size="small" style={{ marginBottom: 16 }}>
            <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
              <UserOutlined /> RM's Request Reason
            </Title>
            <div style={{
              padding: 12,
              background: '#f8f9fa',
              borderRadius: 4,
              borderLeft: `3px solid ${SECONDARY_PURPLE}`
            }}>
              {deferral.rmReason}
            </div>
            <div style={{ marginTop: 8, fontSize: 12 }}>
              <Text type="secondary">
                Requested by: {deferral.rmRequestedBy?.name} ({deferral.rmRequestedBy?.email})
              </Text>
            </div>
          </Card>

          {/* Approval History */}
          <Card size="small" style={{ marginBottom: 16 }}>
            <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
              Approval History
            </Title>
            {deferral.previousApprovers.map((approver, index) => (
              <div key={index} style={{ marginBottom: 8, padding: 8, background: '#f8f9fa' }}>
                <Text strong>{approver.name}</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>{approver.email}</Text>
              </div>
            ))}
          </Card>

          {/* Decision Form */}
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Card size="small">
              <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
                Your Decision
              </Title>
              
              <Form.Item
                name="decision"
                label="Decision"
                rules={[{ required: true, message: 'Please select a decision' }]}
              >
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <Button
                    type={decision === 'accept' ? 'primary' : 'default'}
                    style={{
                      background: decision === 'accept' ? SUCCESS_GREEN : undefined,
                      borderColor: SUCCESS_GREEN,
                      color: decision === 'accept' ? 'white' : SUCCESS_GREEN
                    }}
                    onClick={() => {
                      setDecision('accept');
                      form.setFieldValue('decision', 'accept');
                    }}
                    icon={<CheckCircleOutlined />}
                  >
                    Accept
                  </Button>
                  <Button
                    type={decision === 'reject' ? 'primary' : 'default'}
                    style={{
                      background: decision === 'reject' ? ERROR_RED : undefined,
                      borderColor: ERROR_RED,
                      color: decision === 'reject' ? 'white' : ERROR_RED
                    }}
                    onClick={() => {
                      setDecision('reject');
                      form.setFieldValue('decision', 'reject');
                    }}
                    icon={<CloseCircleOutlined />}
                  >
                    Reject
                  </Button>
                </div>
              </Form.Item>

              {decision === 'accept' && (
                <Form.Item
                  name="finalExpiryDate"
                  label="Final Expiry Date"
                  rules={[{ required: true, message: 'Please select final expiry date' }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    disabledDate={(current) => current && current < dayjs(deferral.originalDueDate)}
                    suffixIcon={<CalendarOutlined />}
                  />
                </Form.Item>
              )}

              <Form.Item
                name="comments"
                label="Comments"
                rules={[{ required: true, message: 'Please provide comments for your decision' }]}
              >
                <TextArea
                  rows={3}
                  placeholder="Enter your comments here..."
                  maxLength={500}
                  showCount
                />
              </Form.Item>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{
                    background: decision === 'accept' ? SUCCESS_GREEN : ERROR_RED,
                    borderColor: decision === 'accept' ? SUCCESS_GREEN : ERROR_RED
                  }}
                >
                  {decision === 'accept' ? 'Approve Deferral' : 'Reject Deferral'}
                </Button>
              </div>
            </Card>
          </Form>
        </div>
      )}
    </Modal>
  );
};

// Main DeferralPending Component
const DeferralPending = ({ userId = "creator_current" }) => {
  const [selectedDeferral, setSelectedDeferral] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mockData, setMockData] = useState([]);
  
  // Filters
  const [searchText, setSearchText] = useState("");

  // Load data
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setMockData(MOCK_PENDING_DEFERRALS);
      setLoading(false);
    }, 300);
  }, []);

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = mockData.filter((d) => d.status === "pending_creator_review");
    
    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(d =>
        d.deferralNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        d.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
        d.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        d.businessName.toLowerCase().includes(searchText.toLowerCase()) ||
        d.deferralTitle.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    return filtered;
  }, [mockData, searchText]);

  // Handle decision
  const handleDecision = async (decisionData) => {
    setLoading(true);
    setTimeout(() => {
      setMockData(prev => prev.filter(d => d._id !== selectedDeferral._id));
      setLoading(false);
      setModalOpen(false);
      setSelectedDeferral(null);
      
      // Show success message
      message.success(
        decisionData.decision === 'accept' 
          ? 'Deferral accepted successfully' 
          : 'Deferral rejected successfully'
      );
    }, 500);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchText("");
  };

  // Updated Columns as per your request
  const columns = [
    {
      title: "Deferral No",
      dataIndex: "deferralNumber",
      key: "deferralNumber",
      width: 140,
      render: (text) => (
        <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
          <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
          {text}
        </div>
      ),
      sorter: (a, b) => a.deferralNumber.localeCompare(b.deferralNumber)
    },
    {
      title: "DCL No",
      dataIndex: "dclNo",
      key: "dclNo",
      width: 120,
      render: (text) => (
        <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
          {text}
        </div>
      ),
      sorter: (a, b) => a.dclNo.localeCompare(b.dclNo)
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: 180,
      render: (text, record) => (
        <div style={{
          fontWeight: 600,
          color: PRIMARY_BLUE,
          display: "flex",
          alignItems: "center",
          gap: 6
        }}>
          <CustomerServiceOutlined style={{ fontSize: 12 }} />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: 11, color: "#666", fontWeight: "normal" }}>
              {record.businessName}
            </div>
            <div style={{ fontSize: 10, color: "#999" }}>
              {record.customerNumber}
            </div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.customerName.localeCompare(b.customerName)
    },
    {
      title: "Document",
      dataIndex: "deferralTitle",
      key: "deferralTitle",
      width: 180,
      render: (text, record) => (
        <div>
          <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
            {text}
          </div>
          <div style={{ fontSize: 11, color: "#999" }}>
            {record.documentType}
          </div>
        </div>
      ),
      sorter: (a, b) => a.deferralTitle.localeCompare(b.deferralTitle)
    },
    {
      title: "Type",
      dataIndex: "deferralType",
      key: "deferralType",
      width: 100,
      render: (type) => (
        <Tag
          color={type === "New" ? "blue" : "orange"}
          style={{
            fontSize: 11,
            fontWeight: "bold",
            borderRadius: 4,
            minWidth: 70,
            textAlign: "center"
          }}
        >
          {type}
        </Tag>
      ),
      filters: [
        { text: 'New', value: 'New' },
        { text: 'Extension', value: 'Extension' }
      ],
      onFilter: (value, record) => record.deferralType === value,
      sorter: (a, b) => a.deferralType.localeCompare(b.deferralType)
    },
    {
      title: "Days Sought",
      dataIndex: "daysSought",
      key: "daysSought",
      width: 100,
      align: "center",
      render: (days) => (
        <div style={{
          fontWeight: "bold",
          color: days > 45 ? ERROR_RED : days > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
          fontSize: 14,
          backgroundColor: days > 45 ? "#fff2f0" : days > 30 ? "#fff7e6" : "#f0f7ff",
          padding: "4px 8px",
          borderRadius: 4,
          display: "inline-block"
        }}>
          {days} days
        </div>
      ),
      sorter: (a, b) => a.daysSought - b.daysSought
    },
    {
      title: "RM",
      dataIndex: "rmRequestedBy",
      key: "rmRequestedBy",
      width: 130,
      render: (rm) => (
        <div style={{ fontSize: 12 }}>
          <div style={{ 
            fontWeight: 500,
            color: PRIMARY_BLUE,
            display: "flex",
            alignItems: "center",
            gap: 4
          }}>
            <UserOutlined style={{ fontSize: 11 }} />
            {rm?.name}
          </div>
          <div style={{ color: "#666", fontSize: 11, fontStyle: "italic" }}>
            Relationship Manager
          </div>
        </div>
      ),
      sorter: (a, b) => a.rmRequestedBy?.name?.localeCompare(b.rmRequestedBy?.name)
    },
    {
      title: "SLA",
      dataIndex: "slaExpiry",
      key: "slaExpiry",
      width: 100,
      fixed: "right",
      render: (date) => {
        const daysLeft = dayjs(date).diff(dayjs(), 'days');
        const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
        
        let color = SUCCESS_GREEN;
        let text = `${daysLeft}d`;
        
        if (daysLeft <= 0 && hoursLeft <= 0) {
          color = ERROR_RED;
          text = 'Expired';
        } else if (daysLeft <= 0) {
          color = ERROR_RED;
          text = `${hoursLeft}h`;
        } else if (daysLeft <= 1) {
          color = ERROR_RED;
          text = `${daysLeft}d`;
        } else if (daysLeft <= 3) {
          color = WARNING_ORANGE;
          text = `${daysLeft}d`;
        }
        
        return (
          <Tag
            color={color}
            style={{ 
              fontWeight: "bold", 
              fontSize: 11,
              minWidth: 50,
              textAlign: "center"
            }}
          >
            {text}
          </Tag>
        );
      },
      sorter: (a, b) => dayjs(a.slaExpiry).diff(dayjs(b.slaExpiry))
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      fixed: "right",
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => {
            setSelectedDeferral(record);
            setModalOpen(true);
          }}
          style={{
            color: PRIMARY_BLUE,
            fontWeight: 500
          }}
        >
          <EyeOutlined /> Review
        </Button>
      )
    }
  ];

  // Custom table styles
  const customTableStyles = `
    .deferral-pending-table .ant-table-wrapper {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
      border: 1px solid #e0e0e0;
    }
    .deferral-pending-table .ant-table-thead > tr > th {
      background-color: #f7f7f7 !important;
      color: ${PRIMARY_BLUE} !important;
      font-weight: 700;
      fontSize: 13px;
      padding: 14px 12px !important;
      border-bottom: 3px solid ${ACCENT_LIME} !important;
      border-right: none !important;
    }
    .deferral-pending-table .ant-table-tbody > tr > td {
      border-bottom: 1px solid #f0f0f0 !important;
      border-right: none !important;
      padding: 12px 12px !important;
      fontSize: 13px;
      color: #333;
    }
    .deferral-pending-table .ant-table-tbody > tr.ant-table-row:hover > td {
      background-color: rgba(181, 211, 52, 0.1) !important;
      cursor: pointer;
    }
    .deferral-pending-table .ant-table-row:hover .ant-table-cell:last-child {
      background-color: rgba(181, 211, 52, 0.1) !important;
    }
    .deferral-pending-table .ant-pagination .ant-pagination-item-active {
      background-color: ${ACCENT_LIME} !important;
      border-color: ${ACCENT_LIME} !important;
    }
    .deferral-pending-table .ant-pagination .ant-pagination-item-active a {
      color: ${PRIMARY_BLUE} !important;
      font-weight: 600;
    }
  `;

  return (
    <div style={{ padding: 24 }}>
      <style>{customTableStyles}</style>

      {/* Header */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderLeft: `4px solid ${ACCENT_LIME}`
        }}
        bodyStyle={{ padding: 16 }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
              Pending Deferrals
              <Badge
                count={filteredData.length}
                style={{
                  backgroundColor: ACCENT_LIME,
                  fontSize: 12
                }}
              />
            </h2>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
              Review and approve/reject deferral requests from Relationship Managers
            </p>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                // Add any export or additional action
              }}
              style={{
                backgroundColor: PRIMARY_BLUE,
                borderColor: PRIMARY_BLUE
              }}
            >
              Export to Excel
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Filters */}
      <Card
        style={{
          marginBottom: 16,
          background: "#fafafa",
          border: `1px solid ${PRIMARY_BLUE}20`,
          borderRadius: 8
        }}
        size="small"
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search by Deferral No, DCL No, Customer, or Document"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              size="middle"
            />
          </Col>
          
          <Col xs={24} sm={12} md={4}>
            <Button
              onClick={clearFilters}
              style={{ width: '100%' }}
              size="middle"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Summary Stats */}
      <div style={{ 
        display: 'flex', 
        gap: 16, 
        marginBottom: 16,
        flexWrap: 'wrap' 
      }}>
        <Card size="small" style={{ flex: 1, minWidth: 150 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: PRIMARY_BLUE }}>
              {filteredData.length}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>Total Pending</div>
          </div>
        </Card>
        <Card size="small" style={{ flex: 1, minWidth: 150 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: WARNING_ORANGE }}>
              {filteredData.filter(d => dayjs(d.slaExpiry).diff(dayjs(), 'days') <= 1).length}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>Urgent (≤1 day)</div>
          </div>
        </Card>
        <Card size="small" style={{ flex: 1, minWidth: 150 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: SECONDARY_PURPLE }}>
              {filteredData.filter(d => d.deferralType === 'New').length}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>New Deferrals</div>
          </div>
        </Card>
        <Card size="small" style={{ flex: 1, minWidth: 150 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: ACCENT_LIME }}>
              {filteredData.filter(d => d.deferralType === 'Extension').length}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>Extensions</div>
          </div>
        </Card>
      </div>

      {/* Table Title */}
      <Divider style={{ margin: "12px 0" }}>
        <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
          Pending Deferral Review ({filteredData.length} items)
        </span>
      </Divider>

      {/* Table */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
          <Spin tip="Loading deferral requests..." />
        </div>
      ) : filteredData.length === 0 ? (
        <Empty
          description={
            <div>
              <p style={{ fontSize: 16, marginBottom: 8 }}>No pending deferral requests</p>
              <p style={{ color: "#999" }}>
                {searchText
                  ? 'Try changing your search term'
                  : 'All deferral requests have been processed'}
              </p>
            </div>
          }
          style={{ padding: 40 }}
        />
      ) : (
        <div className="deferral-pending-table">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="_id"
            size="middle"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
              position: ["bottomCenter"],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} deferrals`
            }}
            scroll={{ x: 1200 }}
            onRow={(record) => ({
              onClick: () => {
                setSelectedDeferral(record);
                setModalOpen(true);
              },
            })}
          />
        </div>
      )}

      {/* Footer Info */}
      <div style={{
        marginTop: 24,
        padding: 16,
        background: "#f8f9fa",
        borderRadius: 8,
        fontSize: 12,
        color: "#666",
        border: `1px solid ${PRIMARY_BLUE}10`
      }}>
        <Row justify="space-between" align="middle">
          <Col>
            Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
          </Col>
          <Col>
            <Text type="secondary">
              Showing {filteredData.length} items • Data as of latest system update
            </Text>
          </Col>
        </Row>
      </div>

      {/* Deferral Review Modal */}
      {selectedDeferral && (
        <DeferralReviewModal
          deferral={selectedDeferral}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedDeferral(null);
          }}
          onDecision={handleDecision}
        />
      )}
    </div>
  );
};

export default DeferralPending;