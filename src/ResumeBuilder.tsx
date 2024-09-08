// src/ResumeBuilder.tsx
import React, { useState } from 'react';
import { ResumeSection, FormData } from './types';
import './App.css'; // Import CSS file

const ResumeBuilder: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    profilePicture: '',
    education: '',
    skills: '',
    workExperience: ''
  });
  const [sections, setSections] = useState<ResumeSection[] | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateResume = () => {
    setSections([
      { id: '1', title: 'Personal Information', content: `Name: ${formData.name}\nContact: ${formData.contact}\nProfile Picture: ${formData.profilePicture}` },
      { id: '2', title: 'Education', content: formData.education },
      { id: '3', title: 'Skills', content: formData.skills },
      { id: '4', title: 'Work Experience', content: formData.workExperience }
    ]);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleContentChange = (id: string, newContent: string) => {
    if (sections) {
      setSections(sections.map(section =>
        section.id === id ? { ...section, content: newContent } : section
      ));
    }
  };

  return (
    <div className="container">
      {!sections ? (
        <div className="form-container">
          <h2>Resume Builder</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateResume();
            }}
          >
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Details:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Upload Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label>Education:</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            <div className="form-group">
              <label>Skills:</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            <div className="form-group">
              <label>Work Experience:</label>
              <textarea
                name="workExperience"
                value={formData.workExperience}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            <button type="submit">Generate Resume</button>
          </form>
        </div>
      ) : (
        <div className="resume-container">
          <h2>Your Resume</h2>
          {sections.map(section => (
            <div key={section.id} className="resume-section">
              <h3>{section.title}</h3>
              {isEditing ? (
                <div>
                  <textarea
                    value={section.content}
                    onChange={(e) => handleContentChange(section.id, e.target.value)}
                    rows={4}
                    cols={50}
                  />
                </div>
              ) : (
                <div>
                  {section.title === 'Personal Information' && formData.profilePicture && (
                    <img src={formData.profilePicture} alt="Profile" />
                  )}
                  <p>{section.content}</p>
                </div>
              )}
            </div>
          ))}
          <button onClick={startEditing}>Edit</button>
          <button onClick={() => setSections(null)}>Start Over</button>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
