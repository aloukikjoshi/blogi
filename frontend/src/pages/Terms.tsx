import React from 'react';
import Layout from '@/components/layout/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Terms of Service</h1>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">Last updated: April 5, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to Blogi. These Terms of Service govern your use of our website and services. 
              By accessing or using Blogi, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Definitions</h2>
            <p>
              <strong>"Blogi"</strong> refers to our website, services, and content.<br />
              <strong>"User"</strong> refers to an individual who has registered with Blogi.<br />
              <strong>"Content"</strong> refers to any text, images, videos, or other material posted on Blogi.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Account Registration</h2>
            <p>
              To use certain features of Blogi, you must register for an account. You agree to provide accurate information
              during the registration process and to keep your account information updated.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Content</h2>
            <p>
              Users are solely responsible for the content they post. By posting content, you grant Blogi a non-exclusive, 
              royalty-free license to use, modify, and display the content in connection with our services.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Prohibited Content</h2>
            <p>
              Users may not post content that is illegal, infringing, harmful, threatening, abusive, harassing, defamatory, 
              vulgar, obscene, or otherwise objectionable.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Termination</h2>
            <p>
              Blogi reserves the right to terminate or suspend accounts for violations of these Terms of Service or for any other reason.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Disclaimer of Warranties</h2>
            <p>
              Blogi is provided "as is" without warranties of any kind, either express or implied.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              Blogi shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              Blogi reserves the right to modify these Terms at any time. We will provide notice of significant changes.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:support@blogi.com" className="text-blogi-600 hover:underline">support@blogi.com</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;