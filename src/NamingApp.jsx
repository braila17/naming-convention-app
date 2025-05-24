import React, { useState } from 'react';

const namingData = {
  projects: ['VN2740', 'VN3451'],
  formTypes: [
    { code: 'DR', name: 'Drawing' },
    { code: 'IT', name: 'Inspection Test Plan' },
    { code: 'MS', name: 'Method Statement' }
  ],
  disciplines: [
    { code: 'EP', name: 'Electrical Power' },
    { code: 'MG', name: 'Mechanical General' },
    { code: 'HS', name: 'Health & Safety' }
  ],
  spatialZones: [
    { code: 'BU1-L1', name: 'Building 1 - Level 1' },
    { code: 'BU2-RF', name: 'Building 2 - Rooftop' },
    { code: 'BU3-M1', name: 'Building 3 - Mezzanine 1' }
  ]
};

const steps = ['project', 'formType', 'discipline', 'spatial', 'sequence', 'revision'];
const prompts = {
  project: 'Which project are you working on?',
  formType: 'What is the purpose of this file?',
  discipline: 'Which discipline is responsible?',
  spatial: 'Which building/level does this relate to?',
  sequence: 'Enter sequence number (e.g., 0001)',
  revision: 'Enter revision (e.g., A or 01)'
};

export default function NamingApp() {
  const [answers, setAnswers] = useState({
    project: '',
    formType: '',
    discipline: '',
    spatial: '',
    sequence: '0001',
    revision: 'A'
  });
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];

  const handleChange = (value) => {
    setAnswers(prev => ({ ...prev, [currentStep]: value }));
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const generateFilename = () => {
    const { project, formType, discipline, spatial, sequence, revision } = answers;
    if (!project || !formType || !discipline || !spatial) return '';
    return `${project}-RHV-XX-XX-${discipline}-${spatial}-${sequence}-${formType}-${revision}`;
  };

  const getOptions = () => {
    switch (currentStep) {
      case 'project': return namingData.projects;
      case 'formType': return namingData.formTypes.map(f => `${f.code} - ${f.name}`);
      case 'discipline': return namingData.disciplines.map(d => `${d.code} - ${d.name}`);
      case 'spatial': return namingData.spatialZones.map(s => `${s.code} - ${s.name}`);
      default: return null;
    }
  };

  const renderStep = () => {
    const options = getOptions();
    if (options) {
      return (
        <select className="w-full border p-2" onChange={e => handleChange(e.target.value.split(' ')[0])}>
          <option value="">Select...</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    return (
      <input
        className="w-full border p-2"
        placeholder={prompts[currentStep]}
        value={answers[currentStep]}
        onChange={e => setAnswers(prev => ({ ...prev, [currentStep]: e.target.value }))}
        onBlur={e => {
          const value = e.target.value;
          if (value.trim() !== '') handleChange(value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') handleChange(answers[currentStep]);
        }}
      />
    );
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Naming Convention Assistant</h1>
      {stepIndex < steps.length ? (
        <>
          <p className="font-semibold">{prompts[currentStep]}</p>
          {renderStep()}
        </>
      ) : (
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm text-gray-500">Generated Filename:</p>
          <div className="flex space-x-2">
            <input
              readOnly
              className="flex-1 font-mono border p-2 bg-white"
              value={generateFilename()}
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(generateFilename());
                alert('Copied to clipboard!');
              }}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
