import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow-md",
                secondary:
                    "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary/50",
                outline:
                    "border-2 border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary",
                ghost:
                    "text-muted-foreground hover:text-foreground hover:bg-secondary",
                link:
                    "text-primary underline-offset-4 hover:underline",
                glow:
                    "relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold overflow-hidden group",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4 text-xs",
                lg: "h-12 px-8 text-base",
                xl: "h-14 px-10 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export interface LinkButtonProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> { }

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <a
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
LinkButton.displayName = "LinkButton";

export { Button, LinkButton, buttonVariants };
