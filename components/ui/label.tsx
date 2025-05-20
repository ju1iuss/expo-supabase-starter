import * as LabelPrimitive from "@rn-primitives/label";
import * as React from "react";
import { cn } from "@/lib/utils";
import { fontFamily } from "@/config/fonts";

const Label = React.forwardRef<
	LabelPrimitive.TextRef,
	LabelPrimitive.TextProps
>(
	(
		{ className, onPress, onLongPress, onPressIn, onPressOut, ...props },
		ref,
	) => (
		<LabelPrimitive.Root
			className="web:cursor-default"
			onPress={onPress}
			onLongPress={onLongPress}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
		>
			<LabelPrimitive.Text
				ref={ref}
				className={cn(
					"text-base native:text-lg text-foreground font-medium leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70 mb-2",
					className,
				)}
				style={{ fontFamily: fontFamily.geistMedium }}
				{...props}
			/>
		</LabelPrimitive.Root>
	),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
