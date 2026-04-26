import { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import UserTypeScreen from './UserTypeScreen';
import SignInScreen from './SignInScreen';
import OrganisationSignInScreen from './OrganisationSignInScreen';
import ParentOnboardingFlow from './parent/ParentOnboardingFlow';
import StudentOnboardingFlow from './student/StudentOnboardingFlow';
import OrganisationOnboardingFlow from './organisation/OrganisationOnboardingFlow';

interface OnboardingFlowProps {
  onComplete: (userData: any) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedUserType, setSelectedUserType] = useState<'parent' | 'student' | 'organisation' | null>(null);

  const handleGetStarted = () => {
    setCurrentScreen(1); // Go to role selection
  };

  const handleSignIn = () => {
    setCurrentScreen(4); // Navigate to Sign In screen
  };

  const handleBackFromSignIn = () => {
    setCurrentScreen(0); // Go back to welcome
  };

  const handleOpenOrgLogin = () => {
    setCurrentScreen(5); // Navigate to Organisation Sign In screen
  };

  const handleBackFromOrgLogin = () => {
    setCurrentScreen(4); // Go back to regular Sign In screen
  };

  const handleSignInComplete = (role: 'parent' | 'learner' | 'organisation') => {
    onComplete({ userType: role });
  };

  const handleOrgSignInComplete = () => {
    onComplete({ userType: 'organisation' });
  };

  const handleBackFromRoleSelection = () => {
    setCurrentScreen(0); // Go back to welcome
  };

  const handleUserTypeSelect = (type: 'parent' | 'student' | 'organisation') => {
    setSelectedUserType(type);
    setCurrentScreen(2); // Move to specific onboarding flow
  };

  const handleBackFromOnboarding = () => {
    setCurrentScreen(1); // Go back to role selection
    setSelectedUserType(null);
  };

  // Screen 0: Welcome
  if (currentScreen === 0) {
    return <WelcomeScreen onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
  }

  // Screen 1: Role Selection
  if (currentScreen === 1) {
    return (
      <UserTypeScreen
        onBack={handleBackFromRoleSelection}
        onContinue={handleUserTypeSelect}
        currentStep={0}
        totalSteps={3}
      />
    );
  }

  // Screen 2: Specific Onboarding Flow
  if (currentScreen === 2) {
    if (selectedUserType === 'parent') {
      return <ParentOnboardingFlow onBack={handleBackFromOnboarding} onComplete={onComplete} />;
    }
    if (selectedUserType === 'student') {
      return <StudentOnboardingFlow onBack={handleBackFromOnboarding} onComplete={onComplete} />;
    }
    if (selectedUserType === 'organisation') {
      return <OrganisationOnboardingFlow onBack={handleBackFromOnboarding} onComplete={onComplete} />;
    }

    return <WelcomeScreen onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
  }

  // Screen 4: Sign In
  if (currentScreen === 4) {
    return (
      <SignInScreen 
        onBack={handleBackFromSignIn} 
        onSignIn={handleSignInComplete}
        onOpenOrgLogin={handleOpenOrgLogin}
      />
    );
  }

  // Screen 5: Organisation Sign In
  if (currentScreen === 5) {
    return (
      <OrganisationSignInScreen
        onBack={handleBackFromOrgLogin}
        onSignIn={handleOrgSignInComplete}
      />
    );
  }

  return <WelcomeScreen onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
}