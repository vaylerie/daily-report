"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import axios from "axios";

import { Button } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { useRouter } from "next/navigation";

// title: string,
// activities: string,
// progress?: string,
// problems?: string,
// solution?: string,
// planTomorrow?: string,     

const formSchema = z.object({
    title: z
        .string()
        .min(3, "Report title must be at least 3 characters.")
        .max(32, "Report title must be at most 32 characters"),
    activities: z
        .string()
        .min(20, "Report activity description must be at least 20 characters.")
        .max(1000, "Report activity description must be at most 1000 characters."),
    progress: z
        .string()
        .max(300, "Progress must be at most 300 characters"),
    problems: z
        .string()
        .max(300, "Problems must be at most 300 characters"),
    solution: z
        .string()
        .max(300, "Solution must be at most 300 characters"),
    planTomorrow: z
        .string()
        .min(16, "Tommorow plan must be at least 16 characters")
        .max(300, "Plan for tommorow must be at most 300 characters"),
});

export default function DailyReportForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            activities: "",
            progress: "",
            problems: "",
            solution: "",
            planTomorrow: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            await axios.post('/api/daily', data);
            toast.success("Successfully reported!");
            setTimeout(() => {
                router.push("/dashboard/history");
            }, 1000);
        } catch {
            toast.error("Try again");
        }
        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
                <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        });
    }

    return (
        <div>
            <form id="form-daily-report" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-daily-report-title">
                                    Title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder=""
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="activities"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-daily-report-activities">
                                    Activities
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupTextarea
                                        {...field}
                                        id="form-daily-report-activities"
                                        placeholder=""
                                        rows={9}
                                        className="min-h-24"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText className="tabular-nums">
                                            {field.value.length}/1000 characters
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                <FieldDescription>
                                    Fill your today activities here.
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="progress"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-daily-report-progress">
                                    Progress
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupTextarea
                                        {...field}
                                        id="form-daily-report-progress"
                                        placeholder=""
                                        rows={6}
                                        className="min-h-24"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText className="tabular-nums">
                                            {field.value.length}/300 characters
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {/* <FieldDescription>
                                    ...
                                </FieldDescription> */}
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <div className="flex flex-col lg:flex-row gap-2">
                        <Controller
                            name="problems"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-daily-report-problems">
                                        Problems
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="form-daily-report-problems"
                                            placeholder=""
                                            rows={4}
                                            className="min-h-24"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length}/300 characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {/* <FieldDescription>
                                        ...
                                    </FieldDescription> */}
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="solution"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-daily-report-solution">
                                        Solution
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="form-daily-report-solution"
                                            placeholder=""
                                            rows={4}
                                            className="min-h-24"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length}/300 characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {/* <FieldDescription>
                                        ...
                                    </FieldDescription> */}
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />                        
                    </div>
                    <Controller
                        name="planTomorrow"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-daily-report-plan-tomorrow">
                                    Plan Tomorrow
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupTextarea
                                        {...field}
                                        id="form-daily-report-plan-tomorrow"
                                        placeholder=""
                                        rows={4}
                                        className="min-h-24"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText className="tabular-nums">
                                            {field.value.length}/1000 characters
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {/* <FieldDescription>
                                    ...
                                </FieldDescription> */}
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </form>
            <Field orientation="horizontal" className="py-8">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Reset
                </Button>
                <Button type="submit" form="form-daily-report">
                    Submit
                </Button>
            </Field>
        </div>
    );
}