"use client";
import React, { useState } from 'react';
import { User, Coffee, Zap, Award, Settings } from 'lucide-react';

// Types for our component
interface SupportTier {
  id: number;
  name: string;
  amount: number;
  description: string;
  perks: string[];
}

interface CreatorPageProps {
  initialName?: string;
  initialDescription?: string;
  initialWalletAddress?: string;
}

const demo: React.FC<CreatorPageProps> = ({
  initialName = '',
  initialDescription = '',
  initialWalletAddress = ''
}) => {
  // State management
  const [creatorName, setCreatorName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [walletAddress, setWalletAddress] = useState(initialWalletAddress);
  
  // Support tiers state
  const [supportTiers, setSupportTiers] = useState<SupportTier[]>([
    {
      id: 1,
      name: 'Buy me a Coffee',
      amount: 5,
      description: 'Support my work with a small donation',
      perks: ['Thank you message', 'Exclusive Discord role']
    },
    {
      id: 2,
      name: 'Buy me a Lunch',
      amount: 10,
      description: 'Help fuel my creativity',
      perks: ['Previous perks', 'Shoutout on social media']
    },
    {
      id: 3,
      name: 'Buy me a Dinner',
      amount: 20,
      description: 'Massive support for my content',
      perks: ['Previous perks', 'Monthly newsletter', 'Early access content']
    }
  ]);

  // Handler for adding a new support tier
  const addSupportTier = () => {
    const newTier: SupportTier = {
      id: supportTiers.length + 1,
      name: 'New Tier',
      amount: 0,
      description: 'Add your tier description',
      perks: []
    };
    setSupportTiers([...supportTiers, newTier]);
  };

  // Update support tier handler
  const updateSupportTier = (id: number, updatedTier: Partial<SupportTier>) => {
    setSupportTiers(supportTiers.map(tier => 
      tier.id === id ? { ...tier, ...updatedTier } : tier
    ));
  };

  // Remove support tier handler
  const removeSupportTier = (id: number) => {
    setSupportTiers(supportTiers.filter(tier => tier.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Creator Profile Section */}
      <div className="flex items-center mb-8">
        <User className="w-16 h-16 mr-4 text-blue-600" />
        <div>
          <input 
            type="text"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            placeholder="Your Name/Brand"
            className="text-2xl font-bold text-gray-800 w-full mb-2"
          />
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell your supporters about your work and mission"
            className="text-gray-600 w-full"
          />
        </div>
      </div>

      {/* Wallet Address */}
      <div className="mb-6 flex items-center">
        <Coffee className="w-6 h-6 mr-2 text-blue-500" />
        <input 
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Your Crypto Wallet Address"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Support Tiers */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-yellow-500" />
          Support Tiers
        </h2>
        {supportTiers.map((tier) => (
          <div 
            key={tier.id} 
            className="border rounded-lg p-4 mb-4 bg-gray-50 relative"
          >
            <div className="flex justify-between items-center mb-2">
              <input 
                type="text"
                value={tier.name}
                onChange={(e) => updateSupportTier(tier.id, { name: e.target.value })}
                className="text-lg font-bold w-full mr-2"
              />
              {supportTiers.length > 1 && (
                <button 
                  onClick={() => removeSupportTier(tier.id)}
                  className="text-red-500 hover:bg-red-100 p-1 rounded"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="flex items-center mb-2">
              <span className="mr-2">Amount:</span>
              <input 
                type="number"
                value={tier.amount}
                onChange={(e) => updateSupportTier(tier.id, { amount: parseFloat(e.target.value) })}
                className="w-24 p-1 border rounded"
              />
            </div>
            
            <textarea 
              value={tier.description}
              onChange={(e) => updateSupportTier(tier.id, { description: e.target.value })}
              placeholder="Tier description"
              className="w-full mb-2 p-1 border rounded"
            />
            
            {/* Perks Management */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Award className="w-4 h-4 mr-1 text-green-500" />
                Perks
              </h3>
              {tier.perks.map((perk, index) => (
                <div key={index} className="flex items-center mb-1">
                  <input 
                    type="text"
                    value={perk}
                    onChange={(e) => {
                      const newPerks = [...tier.perks];
                      newPerks[index] = e.target.value;
                      updateSupportTier(tier.id, { perks: newPerks });
                    }}
                    className="w-full p-1 border rounded mr-2"
                  />
                  <button
                    onClick={() => {
                      const newPerks = tier.perks.filter((_, i) => i !== index);
                      updateSupportTier(tier.id, { perks: newPerks });
                    }}
                    className="text-red-500 hover:bg-red-100 p-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newPerks = [...tier.perks, 'New Perk'];
                  updateSupportTier(tier.id, { perks: newPerks });
                }}
                className="text-blue-500 hover:bg-blue-100 p-2 rounded mt-2"
              >
                Add Perk
              </button>
            </div>
          </div>
        ))}
        
        {/* Add New Tier Button */}
        <button
          onClick={addSupportTier}
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
        >
          <Settings className="w-5 h-5 mr-2" />
          Add New Support Tier
        </button>
      </div>

      {/* Preview/Generate Button */}
      <div className="mt-6">
        <button 
          className="w-full p-4 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
        >
          <Zap className="w-6 h-6 mr-2" />
          Generate Decentralized Page
        </button>
      </div>
    </div>
  );
};

export default demo;