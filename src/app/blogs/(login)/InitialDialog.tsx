import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import DialogTemplate from './dialogTemplate';

function InitialDialog() {
  return (
    <DialogTemplate title="Log in to join the converstation">
      <Button className="border-tsk-primary-dark rounded-xl bg-white border-2 w-full max-w-lg flex items-center justify-center gap-2 mt-6 py-3">
        <Image src="/google-icon.svg" alt="Google logo" width={20} height={20} />
        <h3 className="font-semibold font-body ">Log In With Google</h3>
      </Button>
      <Button className="border-tsk-primary-dark rounded-xl bg-white border-2 w-full max-w-lg flex items-center justify-center gap-2 mt-6 py-3">
        <Image src="/formkit_email.svg" alt="Email icon" width={20} height={20} />
        <h3 className="font-semibold font-body ">Log In With Email</h3>
      </Button>
    </DialogTemplate>
  );
}

export default InitialDialog;
