export const getEmailTemplate = (category: 'hot' | 'warm' | 'cold', leadName: string, companyName: string) => {
  const templates = {
    hot: {
      subject: `Let's Get Started, ${leadName}! 🚀`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #ff4444;">Welcome to Our Automation Journey!</h2>
          
          <p>Hi ${leadName},</p>
          
          <p>Thank you for reaching out! We're excited to help ${companyName} streamline operations and boost productivity through automation.</p>
          
          <p><strong>We noticed you're ready to get started immediately - that's fantastic!</strong></p>
          
          <p>Let's schedule a call at your earliest convenience to discuss:</p>
          <ul>
            <li>Your specific automation needs</li>
            <li>Current pain points and challenges</li>
            <li>Custom solutions tailored for ${companyName}</li>
            <li>Timeline and implementation roadmap</li>
          </ul>
          
          <p style="background: #f0f0f0; padding: 15px; border-left: 4px solid #ff4444;">
            <strong>📅 Book Your Strategy Call:</strong><br/>
            Click here to choose a time that works best for you: [CALENDAR_LINK]
          </p>
          
          <p>Looking forward to transforming ${companyName}'s workflow!</p>
          
          <p>Best regards,<br/>
          Your Automation Team</p>
        </div>
      `
    },
    warm: {
      subject: `Great to Connect, ${leadName}! Here's What We Can Do for ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #ff9944;">Welcome! Let's Explore Automation Together</h2>
          
          <p>Hi ${leadName},</p>
          
          <p>Thank you for your interest in automating ${companyName}'s processes! We're here to help you work smarter, not harder.</p>
          
          <h3 style="color: #ff9944;">Why Companies Choose Us:</h3>
          
          <div style="background: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h4>🎯 Success Story: TechCorp Inc.</h4>
            <p><em>"Reduced manual data entry by 85% and saved 20 hours per week. ROI achieved in just 2 months!"</em></p>
            <p>- Sarah Johnson, Operations Manager</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h4>🚀 Success Story: GrowthHub</h4>
            <p><em>"Automated our entire lead nurturing process. Conversion rates increased by 40%!"</em></p>
            <p>- Mike Chen, CEO</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h4>💡 Success Story: DataFlow Solutions</h4>
            <p><em>"Cut operational costs by 60% through smart automation. Best investment we made!"</em></p>
            <p>- Lisa Martinez, CFO</p>
          </div>
          
          <p><strong>Ready to see similar results for ${companyName}?</strong></p>
          
          <p>Let's schedule a discovery call to explore how we can help you achieve your automation goals.</p>
          
          <p>Best regards,<br/>
          Your Automation Team</p>
        </div>
      `
    },
    cold: {
      subject: `Welcome ${leadName}! Discover How Automation Can Transform ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4444ff;">Welcome to the Future of Work!</h2>
          
          <p>Hi ${leadName},</p>
          
          <p>Thank you for your interest in automation solutions for ${companyName}. We're excited to share how we can help you work more efficiently!</p>
          
          <h3 style="color: #4444ff;">What We Do:</h3>
          <p>We specialize in creating custom automation solutions that eliminate repetitive tasks, reduce errors, and free up your team to focus on what matters most.</p>
          
          <h3 style="color: #4444ff;">Recent Success Stories:</h3>
          
          <div style="background: #f0f4ff; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h4>📊 Case Study: E-Commerce Automation</h4>
            <p>Automated inventory management, order processing, and customer communications for a growing online retailer.</p>
            <p><strong>Results:</strong> 75% reduction in processing time, 95% fewer errors</p>
          </div>
          
          <div style="background: #f0f4ff; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h4>🏢 Case Study: HR Process Automation</h4>
            <p>Streamlined onboarding, payroll, and leave management for a 200+ employee company.</p>
            <p><strong>Results:</strong> Saved 30 hours/week, improved employee satisfaction by 45%</p>
          </div>
          
          <h3 style="color: #4444ff;">Our Approach:</h3>
          <ul>
            <li>✅ Free consultation to understand your needs</li>
            <li>✅ Custom solution design tailored to your business</li>
            <li>✅ Seamless integration with your existing tools</li>
            <li>✅ Ongoing support and optimization</li>
          </ul>
          
          <h3 style="color: #4444ff;">Resources for You:</h3>
          <p>📖 <strong>Blog:</strong> "5 Processes Every Business Should Automate in 2024"</p>
          <p>🎥 <strong>Video:</strong> "How Automation Transformed Our Client's Business"</p>
          <p>📄 <strong>Guide:</strong> "The ROI of Business Automation - A Complete Guide"</p>
          
          <p>We'll be sharing more insights and success stories with you over the coming weeks. Feel free to reach out anytime with questions!</p>
          
          <p>Best regards,<br/>
          Your Automation Team</p>
        </div>
      `
    }
  };

  return templates[category];
};
