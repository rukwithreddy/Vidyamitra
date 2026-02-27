import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/templateSelection.css';

const TEMPLATES = [
    {
        id: 'modern',
        name: 'Modern Professional',
        description: 'Clean, two-column layout ideal for tech and creative roles.',
        color: '#6B46C1',
        image: 'https://via.placeholder.com/300x400?text=Modern+Template' // Placeholder
    },
    {
        id: 'classic',
        name: 'Classic Traditional',
        description: 'Standard single-column layout preferred by traditional industries.',
        color: '#2B6CB0',
        image: 'https://via.placeholder.com/300x400?text=Classic+Template'
    },
    {
        id: 'creative',
        name: 'Creative Designer',
        description: 'Bold typography and colors to stand out from the crowd.',
        color: '#DD6B20',
        image: 'https://via.placeholder.com/300x400?text=Creative+Template'
    }
];

function TemplateSelection() {
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        if (!selectedTemplate) return;
        localStorage.setItem('selectedTemplate', selectedTemplate);

        setIsGenerating(true);
        // Simulate generation delay
        setTimeout(() => {
            setIsGenerating(false);
            navigate({ to: '/resume-ready' });
        }, 2000);
    };

    return (
        <DashboardLayout>
            <div className="template-page">
                <div className="template-header">
                    <h1>Choose Your Resume Template</h1>
                    <p>Select a design that best fits your industry and personal brand. You can always change this later.</p>
                </div>

                <div className="template-grid">
                    {TEMPLATES.map((tmpl) => (
                        <div
                            key={tmpl.id}
                            className={`template-card ${selectedTemplate === tmpl.id ? 'selected' : ''}`}
                            onClick={() => setSelectedTemplate(tmpl.id)}
                        >
                            <div className="template-preview" style={{ borderTop: `6px solid ${tmpl.color}` }}>
                                {/* Simulate a mini-resume visually */}
                                <div className="tmpl-mock-header" style={{ color: tmpl.color }}></div>
                                <div className="tmpl-mock-body">
                                    <div className="tmpl-mock-line w-full"></div>
                                    <div className="tmpl-mock-line w-3/4"></div>
                                    <div className="tmpl-mock-line w-1/2 mt-2"></div>
                                </div>
                            </div>
                            <div className="template-info">
                                <h3>{tmpl.name}</h3>
                                <p>{tmpl.description}</p>
                            </div>
                            {selectedTemplate === tmpl.id && (
                                <div className="template-check">✓ Selected</div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="template-actions">
                    <button
                        className="btn-secondary"
                        onClick={() => navigate({ to: '/profile-builder' })}
                        disabled={isGenerating}
                    >
                        ← Back to Profile
                    </button>

                    <button
                        className="btn-primary"
                        disabled={!selectedTemplate || isGenerating}
                        onClick={handleGenerate}
                    >
                        {isGenerating ? 'Generating Resume...' : 'Generate Resume ✨'}
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default TemplateSelection;
