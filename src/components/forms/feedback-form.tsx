"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { submitFeedback } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { StarRating } from "@/components/star-rating";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Submitting..." : "Submit Feedback"}
    </Button>
  );
}

export function FeedbackForm() {
  const [state, formAction] = useActionState(submitFeedback, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Feedback Submitted",
        description: state.message,
      });
      formRef.current?.reset();
      setRating(0);
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
          {state?.errors?.name && (
            <p className="text-sm text-destructive">{state.errors.name[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
          {state?.errors?.email && (
            <p className="text-sm text-destructive">{state.errors.email[0]}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Rating</Label>
        <StarRating rating={rating} setRating={setRating} />
        <input type="hidden" name="rating" value={rating} />
        {state?.errors?.rating && (
          <p className="text-sm text-destructive">{state.errors.rating[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="feedback">Feedback Message</Label>
        <Textarea id="feedback" name="feedback" rows={5} required />
        {state?.errors?.feedback && (
          <p className="text-sm text-destructive">{state.errors.feedback[0]}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
