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

const DecentralizedCoffeeCreatorPage: React.FC<CreatorPageProps> = ({
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

  // Inline styles
  const styles = {
    container: {
      maxWidth: '64rem',
      margin: '0 auto',
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
   
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '1.5rem'
    },
    creatorProfileSection: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    userIcon: {
      width: '4rem',
      height: '4rem',
      marginRight: '1rem',
      color: '#2563eb'
    },
    creatorNameInput: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      width: '100%',
      marginBottom: '0.5rem',
      padding: '0.25rem 0.5rem',
   
      borderRadius: '0.25rem'
    },
    descriptionTextarea: {
      color: '#4b5563',
      width: '100%',
      padding: '0.25rem 0.5rem',

      borderRadius: '0.25rem'
    },
    walletAddressSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    coffeeIcon: {
      width: '1.5rem',
      height: '1.5rem',
      color: '#3b82f6'
    },
    walletAddressInput: {
      flexGrow: 1,
      padding: '0.5rem',
 
      borderRadius: '0.25rem'
    },
    supportTiersHeader: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center'
    },
    zapIcon: {
      width: '1.5rem',
      height: '1.5rem',
      marginRight: '0.5rem',
      color: '#eab308'
    },
    tierContainer: {
  
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1rem',
      
      position: 'relative' as 'relative'
    },
    tierHeaderContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    tierNameInput: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      flexGrow: 1,
      marginRight: '0.5rem',
      padding: '0.25rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.25rem'
    },
    removeButton: {
      color: '#ef4444',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      ':hover': {
        backgroundColor: '#fee2e2'
      }
    },
    amountSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    amountInput: {
      width: '6rem',
      padding: '0.25rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.25rem'
    },
    perksHeader: {
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    awardIcon: {
      width: '1rem',
      height: '1rem',
      marginRight: '0.25rem',
      color: '#22c55e'
    },
    perkInput: {
      flexGrow: 1,
      padding: '0.25rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.25rem'
    },
    addPerkButton: {
      width: '100%',
      color: '#3b82f6',
      padding: '0.5rem',
      marginTop: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.25rem',
      ':hover': {
        backgroundColor: '#dbeafe'
      }
    },
    addTierButton: {
      width: '100%',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.75rem',
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      ':hover': {
        backgroundColor: '#2563eb'
      }
    },
    generateButton: {
      width: '100%',
      backgroundColor: '#22c55e',
      color: 'white',
      padding: '1rem',
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      ':hover': {
        backgroundColor: '#16a34a'
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Creator Profile Section */}
      <div style={styles.creatorProfileSection}>
        <User style={styles.userIcon} />
        <div style={{flexGrow: 1}}>
          <input 
            type="text"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            placeholder="Your Name/Brand"
            style={styles.creatorNameInput}
          />
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell your supporters about your work and mission"
            style={styles.descriptionTextarea}
            rows={3}
          />
        </div>
      </div>

      {/* Wallet Address */}
      <div style={styles.walletAddressSection}>
        <Coffee style={styles.coffeeIcon} />
        <input 
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Your Crypto Wallet Address"
          style={styles.walletAddressInput}
        />
      </div>

      {/* Support Tiers */}
      <div>
        <h2 style={styles.supportTiersHeader}>
          <Zap style={styles.zapIcon} />
          Support Tiers
        </h2>
        {supportTiers.map((tier) => (
          <div 
            key={tier.id} 
            style={styles.tierContainer}
          >
            <div style={styles.tierHeaderContainer}>
              <input 
                type="text"
                value={tier.name}
                onChange={(e) => updateSupportTier(tier.id, { name: e.target.value })}
                style={styles.tierNameInput}
              />
              {supportTiers.length > 1 && (
                <button 
                  onClick={() => removeSupportTier(tier.id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              )}
            </div>
            
            <div style={styles.amountSection}>
              <span>Amount:</span>
              <input 
                type="number"
                value={tier.amount}
                onChange={(e) => updateSupportTier(tier.id, { amount: parseFloat(e.target.value) })}
                style={styles.amountInput}
              />
            </div>
            
            <textarea 
              value={tier.description}
              onChange={(e) => updateSupportTier(tier.id, { description: e.target.value })}
              placeholder="Tier description"
              style={{...styles.descriptionTextarea, marginTop: '0.5rem'}}
              rows={2}
            />
            
            {/* Perks Management */}
            <div>
              <h3 style={styles.perksHeader}>
                <Award style={styles.awardIcon} />
                Perks
              </h3>
              {tier.perks.map((perk, index) => (
                <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '0.25rem', gap: '0.5rem'}}>
                  <input 
                    type="text"
                    value={perk}
                    onChange={(e) => {
                      const newPerks = [...tier.perks];
                      newPerks[index] = e.target.value;
                      updateSupportTier(tier.id, { perks: newPerks });
                    }}
                    style={styles.perkInput}
                  />
                  <button
                    onClick={() => {
                      const newPerks = tier.perks.filter((_, i) => i !== index);
                      updateSupportTier(tier.id, { perks: newPerks });
                    }}
                    style={styles.removeButton}
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
                style={styles.addPerkButton}
              >
                Add Perk
              </button>
            </div>
          </div>
        ))}
        
        {/* Add New Tier Button */}
        <button
          onClick={addSupportTier}
          style={styles.addTierButton}
        >
          <Settings style={{width: '1.25rem', height: '1.25rem'}} />
          <span>Add New Support Tier</span>
        </button>
      </div>

      {/* Preview/Generate Button */}
      <div>
        <button 
          style={styles.generateButton}
        >
          <Zap style={{width: '1.5rem', height: '1.5rem'}} />
          <span>Generate Decentralized Page</span>
        </button>
      </div>
    </div>
  );
};

export default DecentralizedCoffeeCreatorPage;