import { useState } from 'react';
import { Wallet, ChevronDown } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

/**
 * WDK Wallet Connector Button
 * Allows users to connect with WDK wallet (ERC-4337 account abstraction)
 */
export function WdkWalletButton() {
  const { connectWdkWallet, walletType, walletAddress, connectWallet } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [showSeedPhraseInput, setShowSeedPhraseInput] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWdkSetup = async () => {
    if (!seedPhrase.trim()) {
      alert('Please enter a seed phrase');
      return;
    }

    try {
      setLoading(true);
      // Store seed phrase in localStorage (for demo - use secure storage in production)
      localStorage.setItem('wdk_seed_phrase', seedPhrase);
      await connectWdkWallet();
      setSeedPhrase('');
      setShowSeedPhraseInput(false);
      setIsOpen(false);
    } catch (error) {
      console.error('WDK setup failed:', error);
      alert(`Setup failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isWdkConnected = walletType === 'wdk' && walletAddress;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium 
          transition-all duration-200 text-sm
          ${isWdkConnected
            ? 'bg-accent-500/20 border border-accent-500/30 text-accent-300 hover:bg-accent-500/30'
            : 'bg-white/10 text-white/70 hover:bg-white/15'
          }
        `}
      >
        <Wallet className="w-4 h-4" />
        {isWdkConnected ? (
          <>
            <span>WDK</span>
            <span className="text-xs">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          </>
        ) : (
          'WDK Wallet'
        )}
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-surface-800 border border-white/10 rounded-lg shadow-lg z-50 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 bg-surface-900">
            <h3 className="text-sm font-semibold text-white">WDK Wallet (ERC-4337)</h3>
            <p className="text-xs text-white/60 mt-1">Account abstraction for gas-less transactions</p>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {isWdkConnected ? (
              <>
                <div className="p-3 bg-success-500/10 border border-success-500/20 rounded-lg">
                  <p className="text-xs text-success-300">✓ WDK Connected</p>
                  <p className="text-xs text-white/70 mt-1 font-mono">
                    {walletAddress}
                  </p>
                </div>
              </>
            ) : (
              <>
                {!showSeedPhraseInput ? (
                  <button
                    onClick={() => setShowSeedPhraseInput(true)}
                    className="w-full px-3 py-2 rounded-lg bg-accent-500/20 text-accent-300 hover:bg-accent-500/30 text-sm font-medium transition-colors"
                  >
                    Import Seed Phrase
                  </button>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs text-white/60 mb-2">BIP-39 Seed Phrase</label>
                      <textarea
                        value={seedPhrase}
                        onChange={(e) => setSeedPhrase(e.target.value)}
                        placeholder="Enter your 12 or 24 word seed phrase..."
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs resize-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleWdkSetup}
                        disabled={loading || !seedPhrase.trim()}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-accent-500 text-white text-xs font-medium hover:bg-accent-600 disabled:opacity-50 transition-colors"
                      >
                        {loading ? 'Connecting...' : 'Connect'}
                      </button>
                      <button
                        onClick={() => {
                          setShowSeedPhraseInput(false);
                          setSeedPhrase('');
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-xs font-medium hover:bg-white/15 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-surface-900 border-t border-white/10">
            <p className="text-xs text-white/50">
              💡 Supports sponsored gas payments and token transfers
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WdkWalletButton;
