import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";
import { fontFamily } from "@/config/fonts";

const Textarea = React.forwardRef<
	React.ComponentRef<typeof TextInput>,
	TextInputProps
>(
	(
		{
			className,
			multiline = true,
			numberOfLines = 4,
			placeholderClassName,
			...props
		},
		ref,
	) => {
		return (
			<TextInput
				ref={ref}
				className={cn(
					"web:flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-3 text-base lg:text-base native:text-xl native:leading-[1.25] text-foreground web:ring-offset-background placeholder:text-muted-foreground web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
					props.editable === false && "opacity-50 web:cursor-not-allowed",
					className,
				)}
				placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
				style={{ fontFamily: fontFamily.geistRegular }}
				multiline={multiline}
				numberOfLines={numberOfLines}
				textAlignVertical="top"
				{...props}
			/>
		);
	},
);

Textarea.displayName = "Textarea";

export { Textarea };
