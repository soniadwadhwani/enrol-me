import { useState } from 'react';
import ParentBasicInfoScreen from './ParentBasicInfoScreen';
import ParentLocationScreen from './ParentLocationScreen';
import ParentChildrenScreen from './ParentChildrenScreen';
import ParentInterestsScreen from './ParentInterestsScreen';
import ParentPreferencesScreen from './ParentPreferencesScreen';
import ContactSyncScreen from '../ContactSyncScreen';
import SuccessScreen from '../SuccessScreen';

interface ParentOnboardingFlowProps {
  onBack: () => void;
  onComplete: (userData: any) => void;
}

export default function ParentOnboardingFlow({ onBack, onComplete }: ParentOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<any>({
    basicInfo: null,
    location: null,
    children: [],
    interests: {},
    preferences: null,
    contactsGranted: false,
  });

  const totalSteps = 5;

  const handleBasicInfo = (data: any) => {
    setUserData({ ...userData, basicInfo: data });
    setCurrentStep(1);
  };

  const handleLocation = (location: string) => {
    setUserData({ ...userData, location });
    setCurrentStep(2);
  };

  const handleChildren = (children: any[]) => {
    setUserData({ ...userData, children });
    setCurrentStep(3);
  };

  const handleInterests = (interests: any) => {
    setUserData({ ...userData, interests });
    setCurrentStep(4);
  };

  const handlePreferences = (preferences: any) => {
    setUserData({ ...userData, preferences });
    setCurrentStep(5);
  };

  const handleContactsAllow = () => {
    setUserData((prev: any) => ({ ...prev, contactsGranted: true }));
    setCurrentStep(6);
  };

  const handleContactsSkip = () => {
    setCurrentStep(6);
  };

  const handleEnterApp = () => {
    onComplete({ ...userData, userType: 'parent' });
  };

  const handleStepBack = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const screens = [
    <ParentBasicInfoScreen
      key="basic"
      onBack={handleStepBack}
      onContinue={handleBasicInfo}
      currentStep={0}
      totalSteps={totalSteps}
    />,
    <ParentLocationScreen
      key="location"
      onBack={handleStepBack}
      onContinue={handleLocation}
      currentStep={1}
      totalSteps={totalSteps}
    />,
    <ParentChildrenScreen
      key="children"
      onBack={handleStepBack}
      onContinue={handleChildren}
      currentStep={2}
      totalSteps={totalSteps}
    />,
    <ParentInterestsScreen
      key="interests"
      onBack={handleStepBack}
      onContinue={handleInterests}
      currentStep={3}
      totalSteps={totalSteps}
      children={userData.children}
    />,
    <ParentPreferencesScreen
      key="preferences"
      onBack={handleStepBack}
      onContinue={handlePreferences}
      currentStep={4}
      totalSteps={totalSteps}
    />,
    <ContactSyncScreen
      key="contacts"
      onAllow={handleContactsAllow}
      onSkip={handleContactsSkip}
    />,
    <SuccessScreen key="success" onEnterApp={handleEnterApp} />
  ];

  return <>{screens[currentStep]}</>;
}
