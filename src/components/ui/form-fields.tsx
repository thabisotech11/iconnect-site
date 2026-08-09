import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({
  children,
  htmlFor,
  className,
  optional,
}: {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-2 block text-sm font-medium text-ink", className)}>
      {children}
      {optional && <span className="ml-1 font-normal text-ink-faint">(optional)</span>}
    </label>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn("input", className)} {...props} />
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn("input h-auto min-h-[120px] py-3 resize-y", className)} {...props} />
  )
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn("input appearance-none bg-no-repeat pr-10", className)} {...props}>
      {children}
    </select>
  )
);
Select.displayName = "Select";

export function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
      {children}
    </p>
  );
}

export function FormRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-5", className)}>{children}</div>;
}
