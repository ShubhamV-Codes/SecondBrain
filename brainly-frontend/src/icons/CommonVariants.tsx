 export const CommonSizeVariants = {
    "sm":"size-2",
    "md":"size-4",
    "lg":"size-6"
} as const;

export type Size = keyof typeof CommonSizeVariants

export interface CommonIconInterface{
    size : Size;
}