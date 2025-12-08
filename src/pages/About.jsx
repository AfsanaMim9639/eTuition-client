import { FaRocket, FaUsers, FaHeart } from 'react-icons/fa';

const About = () => (
  <div className="min-h-screen bg-dark-bg pt-24 pb-12">
    <div className="container mx-auto px-4">
      {/* Centered Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          About <span className="gradient-text">TuitionHub</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Connecting students with qualified tutors for quality education
        </p>
      </div>
      
      {/* Centered Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        <div className="card-neon card-neon-pink p-8 text-center rounded-xl">
          <FaRocket className="text-5xl text-neon-pink mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3 neon-text-pink">Our Mission</h3>
          <p className="text-gray-400">
            Make quality education accessible to everyone through technology and innovation
          </p>
        </div>
        
        <div className="card-neon card-neon-blue p-8 text-center rounded-xl">
          <FaUsers className="text-5xl text-neon-blue mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3 neon-text-blue">Our Community</h3>
          <p className="text-gray-400">
            1000+ students and 500+ tutors actively learning and teaching together
          </p>
        </div>
        
        <div className="card-neon card-neon-green p-8 text-center rounded-xl">
          <FaHeart className="text-5xl text-neon-green mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3 neon-text-green">Our Values</h3>
          <p className="text-gray-400">
            Quality, integrity, and student success at the heart of everything we do
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-4xl mx-auto">
        <div className="card-neon card-neon-blue p-8 rounded-xl">
          <h2 className="text-3xl font-bold neon-text-blue mb-6 text-center">Our Story</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            TuitionHub was founded with a simple yet powerful vision: to bridge the gap between 
            students seeking quality education and talented tutors eager to share their knowledge. 
            We understand that finding the right tutor can transform a student's learning journey.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our platform leverages modern technology to make this connection seamless, efficient, 
            and accessible to everyone. Whether you're a student looking for academic support or 
            a tutor wanting to make a difference, TuitionHub is here to help you succeed.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default About;