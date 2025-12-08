'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import DialogTemplate from './DialogTemplate';
import LoginForm from './LoginForm';

type Step = 'initial' | 'login' | null;

function InitialDialog() {
  const [step, setStep] = useState<Step>(null);
  const open = step !== null;

  return (
    <>
      {/* TO BE REMOVED */}
      <Button className="bg-tsk-primary-dark text-white" onClick={() => setStep('initial')}>
        Login to your profile
      </Button>
      {/* TO BE REMOVED */}
      <DialogTemplate
        open={open}
        onOpenChange={(op) => !op && setStep(null)}
        title={step === 'login' ? 'Log in with Email' : 'Log in to join the converstation'}
      >
        {step === 'initial' && (
          <>
            <Button className="border-tsk-primary-dark rounded-xl bg-white border-2 w-full max-w-lg flex items-center justify-center gap-2 mt-6 py-3">
              <Image src="/google-icon.svg" alt="Google logo" width={20} height={20} />
              <h3 className="font-semibold font-body ">Log In With Google</h3>
            </Button>
            <Button
              onClick={() => setStep('login')}
              className="border-tsk-primary-dark rounded-xl bg-white border-2 w-full max-w-lg flex items-center justify-center gap-2 mt-6 py-3"
            >
              <Image src="/formkit_email.svg" alt="Email icon" width={20} height={20} />
              <h3 className="font-semibold font-body ">Log In With Email</h3>
            </Button>
          </>
        )}
        {step === 'login' && <LoginForm />}
      </DialogTemplate>
    </>
  );
}

export default InitialDialog;
