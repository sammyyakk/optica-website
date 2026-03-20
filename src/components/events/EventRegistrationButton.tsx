"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface EventRegistrationButtonProps {
  registrationLink?: string;
  registrationOpen?: boolean;
  maxParticipants?: number;
  currentParticipants?: number;
  className?: string;
}

export default function EventRegistrationButton({
  registrationLink,
  registrationOpen = false,
  maxParticipants,
  currentParticipants,
  className = "",
}: EventRegistrationButtonProps) {
  // Determine button state
  const isFull = maxParticipants && currentParticipants && currentParticipants >= maxParticipants;
  const isDisabled = !registrationOpen || isFull || !registrationLink;

  // Button text
  let buttonText = "Register Now";
  if (!registrationLink) {
    buttonText = "Registration Unavailable";
  } else if (isFull) {
    buttonText = "Event Full";
  } else if (!registrationOpen) {
    buttonText = "Registration Closed";
  }

  // Progress percentage
  const progressPercentage =
    maxParticipants && currentParticipants
      ? Math.min((currentParticipants / maxParticipants) * 100, 100)
      : 0;

  if (isDisabled || !registrationLink) {
    return (
      <div className={className}>
        <button
          disabled
          className="w-full px-6 py-3 rounded-lg font-semibold text-sm bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-600/30"
        >
          {buttonText}
        </button>
        {maxParticipants && currentParticipants && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Participants</span>
              <span>
                {currentParticipants} / {maxParticipants}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full px-6 py-3 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 transition-all duration-300 text-center"
        >
          {buttonText}
        </Link>
      </motion.div>
      {maxParticipants && currentParticipants && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Participants</span>
            <span>
              {currentParticipants} / {maxParticipants}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
