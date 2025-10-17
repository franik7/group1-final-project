import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AILiteracyTraining from './ai.literacy';
import './App.css'

const tableOfContents = [
  {
    id: '1',
    title: 'Introduction to AI Literacy',
    subsections: [
      { id: '1.1', title: 'What is AI Literacy?' },
      { id: '1.2', title: 'Importance of AI Literacy under the EU AI Act' },
      { id: '1.3', title: 'Target Audience: Providers, Deployers, and the Public' },
      { id: '1.4', title: 'Learning Objectives and Outcomes' },
    ],
  },
  {
    id: '2',
    title: 'Understanding AI Systems',
    subsections: [
      { id: '2.1', title: 'What is Artificial Intelligence? Key Concepts and Definitions' },
      {
        id: '2.2',
        title: 'Types of AI Systems',
        subsubsections: [
          { id: '2.2.1', title: 'General-Purpose AI vs. Specific AI Systems' },
          { id: '2.2.2', title: 'High-Risk vs. Low-Risk AI Systems' },
        ],
      },
      { id: '2.3', title: 'How AI Works: Basics of Machine Learning and Algorithms' },
      {
        id: '2.4',
        title: 'Capabilities and Limitations of AI',
        subsubsections: [
          { id: '2.4.1', title: 'Strengths of AI Systems' },
          { id: '2.4.2', title: 'Common Limitations and Biases' },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Ethical and Societal Implications of AI',
    subsections: [
      { id: '3.1', title: 'Ethical Principles in AI Development and Use' },
      { id: '3.2', title: 'Addressing Bias and Discrimination in AI' },
      { id: '3.3', title: 'Privacy and Data Protection Considerations' },
      { id: '3.4', title: 'Societal Impacts: Employment, Equity, and Inclusion' },
      { id: '3.5', title: 'Case Studies: Ethical Challenges in AI Deployment' },
    ],
  },
  {
    id: '4',
    title: 'Legal Framework: The EU AI Act',
    subsections: [
      { id: '4.1', title: 'Overview of the EU AI Act' },
      { id: '4.2', title: 'Article 4: AI Literacy Requirements' },
      { id: '4.3', title: 'Responsibilities of Providers and Deployers' },
      { id: '4.4', title: 'Compliance and Accountability' },
      { id: '4.5', title: 'Penalties for Non-Compliance' },
    ],
  },
  {
    id: '5',
    title: 'Practical AI Literacy for Providers',
    subsections: [
      { id: '5.1', title: 'Understanding AI Development Processes' },
      { id: '5.2', title: 'Risk Assessment and Management for High-Risk AI Systems' },
      { id: '5.3', title: 'Transparency and Documentation Requirements' },
      { id: '5.4', title: 'Best Practices for Ethical AI Design' },
      { id: '5.5', title: 'Tools and Resources for Providers' },
    ],
  },
  {
    id: '6',
    title: 'Practical AI Literacy for Deployers',
    subsections: [
      { id: '6.1', title: 'Selecting and Implementing AI Systems' },
      { id: '6.2', title: 'Monitoring and Evaluating AI Performance' },
      { id: '6.3', title: 'Ensuring Compliance with EU AI Act Obligations' },
      { id: '6.4', title: 'Training Staff for Responsible AI Use' },
      { id: '6.5', title: 'Case Studies: Successful AI Deployment' },
    ],
  },
  {
    id: '7',
    title: 'AI Literacy for the Public',
    subsections: [
      { id: '7.1', title: 'Understanding AI in Everyday Life' },
      { id: '7.2', title: 'Recognizing AI’s Role in Decision-Making' },
      { id: '7.3', title: 'Protecting Personal Data in AI Systems' },
      { id: '7.4', title: 'How to Engage with AI Responsibly' },
      { id: '7.5', title: 'Resources for Further Learning' },
    ],
  },
  {
    id: '8',
    title: 'Interactive Learning Modules',
    subsections: [
      { id: '8.1', title: 'Quizzes and Knowledge Checks' },
      { id: '8.2', title: 'Scenario-Based Exercises' },
      { id: '8.3', title: 'Role-Specific Case Studies (Provider vs. Deployer)' },
      { id: '8.4', title: 'Gamified Learning: AI Ethics Challenges' },
    ],
  },
  {
    id: '9',
    title: 'Implementation and Compliance',
    subsections: [
      { id: '9.1', title: 'Developing an AI Literacy Program for Your Organization' },
      { id: '9.2', title: 'Tools for Assessing AI Literacy Levels' },
      { id: '9.3', title: 'Monitoring and Updating AI Literacy Training' },
      { id: '9.4', title: 'Collaboration with EU AI Act Authorities' },
    ],
  },
  {
    id: '10',
    title: 'Resources and Support',
    subsections: [
      { id: '10.1', title: 'Glossary of AI Terms' },
      { id: '10.2', title: 'Links to EU AI Act Documentation' },
      { id: '10.3', title: 'Recommended Readings and External Resources' },
      { id: '10.4', title: 'Contact Information for EU AI Office and National Authorities' },
      { id: '10.5', title: 'Community Forums and Discussion Groups' },
    ],
  },
  {
    id: '11',
    title: 'Certification and Progress Tracking',
    subsections: [
      { id: '11.1', title: 'AI Literacy Certification Program' },
      { id: '11.2', title: 'Progress Tracking and Reporting' },
      { id: '11.3', title: 'Continuing Education and Refresher Courses' },
    ],
  },
];

function App() {
  const [count, setCount] = useState(0);
  const [selectedSection, setSelectedSection] = useState('1.1');
  
  const handleSectionClick = (id) => {
    setSelectedSection(id);
  };

  const renderContent = () => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {tableOfContents
            .flatMap((section) =>
              section.subsections
                ? [
                    { id: section.id, title: section.title },
                    ...section.subsections.map((sub) => ({
                      id: sub.id,
                      title: sub.title,
                    })),
                    ...(section.subsections.flatMap((sub) =>
                      sub.subsubsections
                        ? sub.subsubsections.map((subsub) => ({
                            id: subsub.id,
                            title: subsub.title,
                          }))
                        : []
                    )),
                  ]
                : [{ id: section.id, title: section.title }]
            )
            .find((item) => item.id === selectedSection)?.title || 'Select a section'}
        </h2>
        <p className="text-gray-600">
          Placeholder content for section {selectedSection}. This area will display the relevant training material when implemented.
        </p>
      </div>
    );
  };

  return (
   <div id="root">
      <AILiteracyTraining />
    </div>
  )
}

export default App
