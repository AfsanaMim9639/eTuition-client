import { FaRocket, FaUsers, FaHeart } from 'react-icons/fa';

export const About = () => (
  <div className="min-h-screen bg-dark-bg pt-24 pb-12">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold text-center mb-6">
        About <span className="gradient-text">TuitionHub</span>
      </h1>
      <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-12">
        Connecting students with qualified tutors for quality education
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="card-neon card-neon-pink p-8 text-center rounded-xl">
          <FaRocket className="text-5xl text-neon-pink mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3 neon-text-pink">Our Mission</h3>
          <p className="text-gray-400">Make quality education accessible to everyone through technology</p>
        </div>
        <div className="card-neon card-neon-blue p-8 text-center rounded-xl">
          <FaUsers className="text-5xl text-neon-blue mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3 neon-text-blue">Our Community</h3>
          <p className="text-gray-400">1000+ students and 500+ tutors actively learning and teaching</p>
        </div>
        <div className="card-neon card-neon-green p-8 text-center rounded-xl">
          <FaHeart className="text-5xl text-neon-green mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3 neon-text-green">Our Values</h3>
          <p className="text-gray-400">Quality, integrity, and student success at the heart of everything</p>
        </div>
      </div>
    </div>
  </div>
);
