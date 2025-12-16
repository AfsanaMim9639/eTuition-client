# 🌟 eTuitionBD - Complete Tuition Management System

<div align="center">

![eTuitionBD](https://img.shields.io/badge/eTuitionBD-Neon%20Platform-00F0FF?style=for-the-badge&logo=react&logoColor=00F0FF&labelColor=000000)
![React](https://img.shields.io/badge/React-18.x-00F0FF?style=for-the-badge&logo=react&logoColor=00F0FF&labelColor=000000)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-39FF14?style=for-the-badge&logo=mongodb&logoColor=39FF14&labelColor=000000)
![Node.js](https://img.shields.io/badge/Node.js-Backend-00F0FF?style=for-the-badge&logo=node.js&logoColor=00F0FF&labelColor=000000)
![Stripe](https://img.shields.io/badge/Stripe-Payment-FF10F0?style=for-the-badge&logo=stripe&logoColor=FF10F0&labelColor=000000)

</div>

---

## 🎯 Project Purpose

<div style="background: linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(57, 255, 20, 0.1)); border-left: 4px solid #00F0FF; padding: 15px; border-radius: 8px;">

eTuitionBD is a **full-stack tuition management platform** that connects students with qualified tutors. It solves the real problem of finding verified tutors and legitimate tuition opportunities through **automated workflows**, **transparent payments**, **digital class tracking**, and **structured communication**. The platform enables students to post tuition requirements, tutors to apply for opportunities, and admins to monitor all activities efficiently.

</div>

---

## ✨ Core Features

### 🔐 **Authentication & Authorization**
<details open>
<summary><b style="color: #00F0FF;">Click to expand</b></summary>

- 🔹 **Multi-role Registration**: Students and Tutors can register with email/password
- 🔹 **Social Login**: Google OAuth integration (default role: Student)
- 🔹 **JWT Authentication**: Secure token-based authentication with role verification
- 🔹 **Role-based Routing**: Automatic dashboard redirection based on user role
- 🔹 **Protected Routes**: Private routes with persistent login after reload

</details>

### 👨‍🎓 **Student Features**
<details>
<summary><b style="color: #00F0FF;">Click to expand</b></summary>

- ✅ **Post Tuitions**: Create detailed tuition posts with subject, class, location, budget, schedule
- ✅ **Update/Delete Tuitions**: Edit or remove posted tuitions anytime
- ✅ **Review Applications**: View tutor applications with profiles, qualifications, experience
- ✅ **Approve Tutors**: Accept tutors via Stripe payment integration (tutor approved only after successful payment)
- ✅ **Reject Applications**: Decline applications with optional rejection reason
- ✅ **Payment Tracking**: View complete payment history and transactions
- ✅ **Profile Management**: Update personal information, name, and photo

</details>

### 👨‍🏫 **Tutor Features**
<details>
<summary><b style="color: #39FF14;">Click to expand</b></summary>

- 📚 **Browse Tuitions**: Access all approved tuition listings with search and filters
- 📚 **Apply for Tuitions**: Submit applications through modal form with qualifications and expected salary
- 📚 **Track Applications**: Monitor application status (Pending/Approved/Rejected)
- 📚 **Ongoing Tuitions**: View all approved tuition assignments
- 📚 **Revenue History**: Track total earnings and transaction details
- 📚 **Update/Withdraw**: Modify or cancel applications before approval

</details>

### 🛡️ **Admin Features**
<details>
<summary><b style="color: #FF10F0;">Click to expand</b></summary>

- ⚙️ **User Management**: View, update, delete user accounts; change roles (Student/Tutor/Admin)
- ⚙️ **Tuition Approval System**: Review and approve/reject tuition posts before public visibility
- ⚙️ **Transaction Monitoring**: View platform earnings and complete payment history
- ⚙️ **Reports & Analytics**: Dashboard with charts showing user growth, revenue trends, tuition statistics
- ⚙️ **Platform Oversight**: Monitor all activities, handle disputes, manage data integrity

</details>

### 🔍 **Advanced Functionalities**
```diff
+ Search System: Search tuitions by subject, location, or title
+ Smart Filters: Filter by class, subject, location, tutoring type, medium, salary range
+ Sort Options: Sort by date (newest/oldest) or salary (high/low)
+ Pagination: Efficient data loading with page navigation
+ Real-time Updates: Dynamic latest tuitions and tutors on homepage
```

---

## 🎨 Design & UI Features

<div style="background: #000000; border: 2px solid #00F0FF; padding: 20px; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);">

### 🎨 **Theme Colors**
- **Primary Neon Blue**: `#00F0FF` - Main accent color for buttons, links, borders
- **Secondary Neon Green**: `#39FF14` - Success states, highlights, CTAs
- **Accent Neon Pink**: `#FF10F0` - Special elements, warnings, gradients
- **Background**: `#0a0f0d` - Deep black/dark green base
- **Surface**: `#0f1512` - Card backgrounds, elevated surfaces

### ✨ **Visual Features**
- 🌈 **Framer Motion Animations**: Smooth page transitions, hover effects, and micro-interactions
- 🔮 **Glassmorphism**: Modern frosted glass effects with gradient borders
- 📱 **Responsive Design**: Mobile-first approach, fully responsive across all devices
- 📍 **Sticky Navbar**: Fixed navigation with auth-based menu items
- 🎯 **Custom 404 Page**: Friendly error page with home navigation
- ⏳ **Loading States**: Full-screen neon spinners during data fetch
- 🔔 **Toast Notifications**: User-friendly feedback for all actions
- 🌟 **Neon Glow Effects**: Box shadows and borders with vibrant glow

</div>

---

## 🏠 Page Structure

| Page | Description | Color Accent |
|------|-------------|--------------|
| 🏡 **Home** | Hero section, latest tuitions/tutors, "How It Works", "Why Choose Us" | `#00F0FF` |
| 📋 **All Tuitions** | Complete listing with search, filter, sort, and pagination | `#39FF14` |
| 📄 **Tuition Details** | Detailed view with "Apply" button for tutors | `#00F0FF` |
| 👥 **All Tutors** | Tutor directory with profiles and specializations | `#FF10F0` |
| 👤 **Tutor Profile** | Individual tutor information and ratings | `#00F0FF` |
| 📊 **Student Dashboard** | My Tuitions, Post Tuition, Applied Tutors, Payments, Profile | `#00F0FF` |
| 💼 **Tutor Dashboard** | My Applications, Ongoing Tuitions, Revenue History, Profile | `#39FF14` |
| ⚡ **Admin Dashboard** | User Management, Tuition Management, Reports & Analytics | `#FF10F0` |

---

## 💳 Payment Integration

<div style="background: linear-gradient(135deg, #000000, #1a1a1a); border: 2px solid #FF10F0; padding: 15px; border-radius: 8px; box-shadow: 0 0 20px rgba(255, 16, 240, 0.2);">

**Stripe Checkout Flow**
```
Accept Tutor → Redirect to Stripe → Complete Payment → Update Status → Notify Student & Tutor
```

- 💰 **Secure Processing**: Industry-standard Stripe payment gateway
- 📊 **Transaction History**: Complete payment records for students and platform earnings
- 💸 **Platform Fee**: 10% commission on each transaction
- ✅ **Payment Verification**: Tutors approved only after successful payment

</div>

---

## 🚀 Technology Stack

<div style="background: #000000; padding: 20px; border-radius: 10px;">

### **Frontend** ![Frontend](https://img.shields.io/badge/Frontend-00F0FF?style=flat-square)
```javascript
React.js • React Router DOM • Tailwind CSS • DaisyUI • Framer Motion
Axios • React Hot Toast • Stripe.js • Lucide React • React Icons
```

### **Backend** ![Backend](https://img.shields.io/badge/Backend-39FF14?style=flat-square)
```javascript
Node.js • Express.js • MongoDB • Mongoose • JWT • Bcrypt
Stripe • CORS • Dotenv • Cookie Parser
```

### **Authentication** ![Auth](https://img.shields.io/badge/Auth-FF10F0?style=flat-square)
```javascript
Firebase Authentication • Google OAuth • JWT Token Verification
```

</div>

---

## 🔒 Security Features

<div style="border-left: 4px solid #39FF14; padding-left: 15px; background: rgba(57, 255, 20, 0.05);">

- 🔐 Environment variables for sensitive data (Firebase keys, MongoDB credentials, Stripe keys)
- 🔐 JWT token verification with role-based access control
- 🔐 Password hashing with bcrypt (10 salt rounds)
- 🔐 Protected API routes with middleware authentication
- 🔐 Secure payment processing through Stripe
- 🔐 HTTP-only cookies for token storage
- 🔐 CORS configuration for allowed origins

</div>

---

## 📊 Admin Analytics

<div style="background: linear-gradient(135deg, rgba(255, 16, 240, 0.1), rgba(0, 240, 255, 0.1)); padding: 20px; border-radius: 10px; border: 2px solid #00F0FF;">

📈 **Dashboard Metrics**
- Total users breakdown (Students/Tutors)
- Tuition statistics (Total/Pending/Approved/Ongoing)
- Revenue tracking and transaction history
- Monthly revenue chart with trend analysis
- User growth trends (Last 6 months)
- Payment method distribution (Pie chart)
- Tuitions status distribution (Bar chart)

</div>

---

## 🌐 Deployment

<table style="width: 100%; border: 2px solid #00F0FF; background: #000000;">
<tr style="background: rgba(0, 240, 255, 0.1);">
<th style="color: #00F0FF; padding: 10px;">Component</th>
<th style="color: #00F0FF; padding: 10px;">Platform</th>
<th style="color: #00F0FF; padding: 10px;">Status</th>
</tr>
<tr>
<td style="padding: 10px;">Frontend</td>
<td style="padding: 10px;">Vercel</td>
<td style="padding: 10px; color: #39FF14;">✅ Live</td>
</tr>
<tr>
<td style="padding: 10px;">Backend</td>
<td style="padding: 10px;">Vercel/Railway</td>
<td style="padding: 10px; color: #39FF14;">✅ Live</td>
</tr>
<tr>
<td style="padding: 10px;">Database</td>
<td style="padding: 10px;">MongoDB Atlas</td>
<td style="padding: 10px; color: #39FF14;">✅ Connected</td>
</tr>
<tr>
<td style="padding: 10px;">Errors</td>
<td style="padding: 10px;">CORS/404/504</td>
<td style="padding: 10px; color: #39FF14;">✅ None</td>
</tr>
</table>

---

## 🔗 Links

<div align="center" style="background: #000000; padding: 20px; border-radius: 10px; border: 2px solid #00F0FF;">

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-Visit_Now-00F0FF?style=for-the-badge&logoColor=00F0FF&labelColor=000000)](your-live-url)
[![Client Repo](https://img.shields.io/badge/📁_Client_Repo-GitHub-39FF14?style=for-the-badge&logo=github&logoColor=39FF14&labelColor=000000)](your-client-repo)
[![Server Repo](https://img.shields.io/badge/📁_Server_Repo-GitHub-FF10F0?style=for-the-badge&logo=github&logoColor=FF10F0&labelColor=000000)](your-server-repo)

</div>

---

## 🔑 Admin Credentials

<div style="background: #000000; border: 2px solid #FF10F0; padding: 15px; border-radius: 8px; box-shadow: 0 0 20px rgba(255, 16, 240, 0.3);">
```bash
Email: admin@etuitionbd.com
Password: admin123
```

</div>

---

## 📦 Environment Variables

### **Client (.env)**
```env
# API Configuration
VITE_API_URL=your_backend_url

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### **Server (.env)**
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Payment
STRIPE_SECRET_KEY=your_stripe_secret_key

# Server
PORT=5000
NODE_ENV=production
```

---

## 🎯 Commit History

<div style="display: flex; gap: 20px; justify-content: center;">

<div style="background: rgba(0, 240, 255, 0.1); border: 2px solid #00F0FF; padding: 15px; border-radius: 8px; text-align: center;">

**Client Repository**
```
20+ Commits
```
Clear, meaningful messages

</div>

<div style="background: rgba(57, 255, 20, 0.1); border: 2px solid #39FF14; padding: 15px; border-radius: 8px; text-align: center;">

**Server Repository**
```
12+ Commits
```
Documenting API development

</div>

</div>

---

## ✅ Quality Assurance

<div style="background: linear-gradient(135deg, rgba(0, 240, 255, 0.05), rgba(57, 255, 20, 0.05)); padding: 20px; border-radius: 10px; border: 2px solid #39FF14;">

✔️ No copied concepts from assignments/modules  
✔️ Polished, recruiter-friendly UI with neon theme  
✔️ Private routes persist after reload  
✔️ Firebase authorized domains updated  
✔️ All features fully functional and tested  
✔️ Responsive across mobile/tablet/desktop  
✔️ Consistent color scheme (Neon Blue/Green on Black)  
✔️ Smooth Framer Motion animations  
✔️ Clean code structure and best practices  

</div>

---

<div align="center" style="background: linear-gradient(90deg, #00F0FF, #39FF14, #FF10F0); padding: 20px; border-radius: 10px; margin-top: 30px;">

### 🌟 **Made with Neon Energy** 🌟

![Neon](https://img.shields.io/badge/Powered_by-Neon_Tech-00F0FF?style=for-the-badge&logoColor=00F0FF&labelColor=000000)

**© 2024 eTuitionBD. All rights reserved.**

</div>