import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";
import { fontFamily } from "@/config/fonts";

const Input = React.forwardRef<
	React.ComponentRef<typeof TextInput>,
	TextInputProps
>(({ className, placeholderClassName, ...props }, ref) => {
	return (
		<TextInput
			ref={ref}
			className={cn(
				"web:flex h-14 native:h-16 web:w-full rounded-xl border border-input bg-background px-4 web:py-3 text-base lg:text-base native:text-xl native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
				props.editable === false && "opacity-50 web:cursor-not-allowed",
				className,
			)}
			placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
			style={{ fontFamily: fontFamily.geistRegular }}
			{...props}
		/>
	);
});

Input.displayName = "Input";

export { Input };
