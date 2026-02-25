// Check if onboarding is completed, redirect if not
chrome.storage.local.get(['onboardingCompleted'], (result) => {
    if (!result.onboardingCompleted) {
      // User hasn't completed onboarding, redirect to onboarding page
      window.location.href = 'onboarding.html';
    }
  });