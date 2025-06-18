import React from 'react'
import { Link } from "react-router-dom";
import Button from "./components/ui/Button";
import { Card, CardContent } from "./components/ui/Card";
import { BarChart3, ShieldCheck, MessageCircle, Users, FileText, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
// import Button from 'react-bootstrap/Button';







const Function = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Salary Management System</h1>
        <nav>
          <Link to="/login" className="text-white px-4">Login</Link>
          <Link to="/signup" className="text-white px-4">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-500 text-white">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4">
          Manage Salaries & Expenses Efficiently
        </motion.h2>
        <p className="text-lg mb-6">A secure and powerful platform for salary, budget, and expense tracking.</p>
        <Button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow-md">
          <Link to="/signup">Get Started</Link>
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 grid md:grid-cols-3 gap-6">
        <FeatureCard icon={<BarChart3 size={40} />} title="View Salary Insights" description="Track salary & expenses with intuitive graphs." />
        <FeatureCard icon={<ShieldCheck size={40} />} title="Admin Control" description="Manage users with block/unblock functionality." />
        <FeatureCard icon={<MessageCircle size={40} />} title="Complaint System" description="Users can raise complaints & receive admin responses." />
        <FeatureCard icon={<Users size={40} />} title="User Management" description="Admin can manage and monitor all registered users." />
        <FeatureCard icon={<FileText size={40} />} title="Reports & Documentation" description="Generate detailed salary reports for better financial planning." />
        <FeatureCard icon={<DollarSign size={40} />} title="Budget Tracking" description="Monitor income and expenses to maintain financial stability." />
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-100 py-10 text-center">
        <h2 className="text-3xl font-semibold mb-4">Start Managing Your Finances Today!</h2>
        <p className="text-gray-700 mb-6">Sign up now and take control of your salary management with ease.</p>
        <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md">
          <Link to="/signup">Join Now</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 Salary Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="shadow-lg p-6 text-center bg-white rounded-xl">
      <CardContent>
        <div className="text-blue-600 mb-3 flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

export default Function