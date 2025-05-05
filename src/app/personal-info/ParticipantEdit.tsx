import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format, parseISO, isValid } from "date-fns";
import { updateParticipants } from "@/services/booking";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Participant {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  participant_type: string;
}

interface ParticipantFormData {
  id: number;
  first_name: string;
  last_name: string;
  participant_type?: string;
  date_of_birth: Date | null;
}

interface UpdateParticipantsPayload {
  participants: {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth?: string | null;
  }[];
}

export default function ParticipantEdit({
  participants,
  refetch,
}: {
  participants: Participant[];
  refetch: any;
}) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ParticipantFormData[]>(() => {
    return participants.map((p) => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      participant_type: p.participant_type,
      date_of_birth: p.date_of_birth ? parseISO(p.date_of_birth) : null,
    }));
  });
  const [errors, setErrors] = useState<Record<number, string[]>>({});
  const [dateInputs, setDateInputs] = useState<Record<number, string>>(() => {
    return participants.reduce((acc, p, index) => {
      acc[index] = p.date_of_birth ? format(parseISO(p.date_of_birth), "MM/dd/yyyy") : "";
      return acc;
    }, {} as Record<number, string>);
  });

  const { mutate: updateParticipantsMutation, isPending } = useMutation({
    mutationFn: async (data: UpdateParticipantsPayload) => {
      return updateParticipants(data);
    },
    onSuccess: () => {
      toast.success("Participants updated successfully");
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update participants");
    },
  });

  const handleDateChange = (date: Date | null, index: number) => {
    const newFormData = [...formData];
    newFormData[index] = {
      ...newFormData[index],
      date_of_birth: date,
    };
    setFormData(newFormData);

    // Update the input text
    const newDateInputs = { ...dateInputs };
    newDateInputs[index] = date ? format(date, "MM/dd/yyyy") : "";
    setDateInputs(newDateInputs);

    // Clear errors
    if (errors[index]?.length) {
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const handleDateInputChange = (value: string, index: number) => {
    // Update the input text
    const newDateInputs = { ...dateInputs };
    newDateInputs[index] = value;
    setDateInputs(newDateInputs);

    // Try to parse the date
    const dateParts = value.split("/");
    if (dateParts.length === 3) {
      const month = parseInt(dateParts[0], 10);
      const day = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);
      
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1900) {
        const parsedDate = new Date(year, month - 1, day);
        if (isValid(parsedDate)) {
          const newFormData = [...formData];
          newFormData[index] = {
            ...newFormData[index],
            date_of_birth: parsedDate,
          };
          setFormData(newFormData);
        }
      }
    } else if (value === "") {
      const newFormData = [...formData];
      newFormData[index] = {
        ...newFormData[index],
        date_of_birth: null,
      };
      setFormData(newFormData);
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof ParticipantFormData,
    value: string
  ) => {
    const newFormData = [...formData];
    newFormData[index] = {
      ...newFormData[index],
      [field]: value,
    };
    setFormData(newFormData);

    // Clear errors when user types
    if (errors[index]?.length) {
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<number, string[]> = {};
    let isValid = true;

    formData.forEach((participant, index) => {
      const participantErrors: string[] = [];

      if (!participant?.first_name?.trim()) {
        participantErrors.push("First name is required");
      }

      if (!participant?.last_name?.trim()) {
        participantErrors.push("Last name is required");
      }

      if (participant.date_of_birth && participant.date_of_birth > new Date()) {
        participantErrors.push("Date of birth cannot be in the future");
      } else if (
        dateInputs[index] &&
        dateInputs[index].trim() !== "" &&
        !participant.date_of_birth
      ) {
        participantErrors.push("Please enter a valid date (MM/DD/YYYY)");
      }

      if (participantErrors.length) {
        newErrors[index] = participantErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
  
    updateParticipantsMutation({
      participants: formData.map((p) => {
        const participantData: {
          id: number;
          first_name: string;
          last_name: string;
          date_of_birth?: string;
        } = {
          id: p.id,
          first_name: p.first_name,
          last_name: p.last_name,
        };
  
        if (p.date_of_birth) {
          participantData.date_of_birth = format(p.date_of_birth, "yyyy-MM-dd");
        }
  
        return participantData;
      }),
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Edit Participants
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {formData.map((participant, index) => (
            <div
              key={participant.id}
              className="border rounded-lg p-4 space-y-4"
            >
              <h3 className="font-medium">
                {participant?.participant_type} {index + 1}
              </h3>

              {/* Name fields in grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor={`first_name_${index}`}
                    className="block text-sm font-medium"
                  >
                    First Name
                  </label>
                  <Input
                    id={`first_name_${index}`}
                    value={participant.first_name}
                    onChange={(e) =>
                      handleInputChange(index, "first_name", e.target.value)
                    }
                    placeholder="First name"
                    className={
                      errors[index]?.some((e) => e.includes("First name"))
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {errors[index]?.some((e) => e.includes("First name")) && (
                    <p className="text-sm text-red-500">
                      {errors[index].find((e) => e.includes("First name"))}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor={`last_name_${index}`}
                    className="block text-sm font-medium"
                  >
                    Last Name
                  </label>
                  <Input
                    id={`last_name_${index}`}
                    value={participant.last_name}
                    onChange={(e) =>
                      handleInputChange(index, "last_name", e.target.value)
                    }
                    placeholder="Last name"
                    className={
                      errors[index]?.some((e) => e.includes("Last name"))
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {errors[index]?.some((e) => e.includes("Last name")) && (
                    <p className="text-sm text-red-500">
                      {errors[index].find((e) => e.includes("Last name"))}
                    </p>
                  )}
                </div>
              </div>

              {/* Date of Birth (full width) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Date of Birth (optional)
                </label>
                <div className="flex flex-col space-y-1">
                  <div className="relative">
                    <DatePicker
                      selected={participant.date_of_birth}
                      onChange={(date) => handleDateChange(date, index)}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="MM/DD/YYYY"
                      className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        errors[index]?.some((e) => e.includes("Date of birth")) &&
                          "border-red-500"
                      )}
                      showYearDropdown
                      dropdownMode="select"
                      maxDate={new Date()}
                      minDate={new Date("1900-01-01")}
                      customInput={
                        <input
                          value={dateInputs[index]}
                          onChange={(e) =>
                            handleDateInputChange(e.target.value, index)
                          }
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      }
                    />
                  </div>
                  {errors[index]?.some((e) => e.includes("Date of birth")) && (
                    <p className="text-sm text-red-500">
                      {errors[index].find((e) => e.includes("Date of birth"))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            className="px-4 py-2 bg-green-100 hover:bg-green-300 text-black border border-green-500 font-medium rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}