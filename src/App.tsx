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
    <div>
      {!sections ? (
        <div>
          <h2>Resume Builder</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateResume();
            }}
          >
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Contact Details:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Profile Picture URL:</label>
              <input
                type="text"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Education:</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            <div>
              <label>Skills:</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            <div>
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
        <div>
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
