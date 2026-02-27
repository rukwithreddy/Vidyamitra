import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import { getProfile } from '../services/apiService';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, MapPin, Mail, Sparkles, Loader2 } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../lib/animations';

function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            try {
                const response = await getProfile();
                if (response.success && response.data) {
                    setProfileData(response.data);
                } else {
                    setError(response.message || 'Could not load profile data');
                }
            } catch (err) {
                setError('Network error');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    // Helper functions to safely extract data from the db structure
    const getExperience = () => {
        if (!profileData || !profileData.experience) return [];
        return Array.isArray(profileData.experience) ? profileData.experience : [profileData.experience];
    };

    const getEducation = () => {
        if (!profileData || !profileData.education) return [];
        return Array.isArray(profileData.education) ? profileData.education : [profileData.education];
    };

    return (
        <DashboardLayout>
            <motion.div className="max-w-4xl mx-auto p-6 text-white" variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div className="flex items-center gap-4 mb-8" variants={fadeUpVariant}>
                    <div className="w-16 h-16 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center">
                        <User size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold font-heading">My Profile</h1>
                        <p className="text-gray-400">View your saved career profile information.</p>
                    </div>
                </motion.div>

                {loading && (
                    <motion.div className="flex flex-col items-center justify-center py-20" variants={fadeUpVariant}>
                        <Loader2 className="animate-spin text-purple-500 mb-4" size={48} />
                        <p className="text-gray-400">Loading your profile from the server...</p>
                    </motion.div>
                )}

                {!loading && error && (
                    <motion.div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 text-center" variants={fadeUpVariant}>
                        <p className="text-red-400 mb-4">{error}</p>
                        <p className="text-gray-300 text-sm mb-6">Make sure you are logged in and have created a profile.</p>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors inline-block"
                            onClick={() => navigate({ to: '/profile-builder' })}
                        >
                            Build Profile Now
                        </button>
                    </motion.div>
                )}

                {!loading && !error && profileData && (
                    <motion.div className="grid gap-6" variants={staggerContainer}>
                        {/* Basic Info Card */}
                        <motion.div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 shadow-xl" variants={fadeUpVariant}>
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                                <Sparkles className="text-blue-500" size={20} /> Personal Summary
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <User className="text-gray-500" size={18} />
                                    <span className="font-semibold text-white text-lg">{profileData.name || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Mail className="text-gray-500" size={18} /> {profileData.email || 'N/A'}
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <MapPin className="text-gray-500" size={18} /> {profileData.location || 'Location not specified'}
                                </div>
                                {profileData.current_role && (
                                    <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5">
                                        <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-1">Current Role</p>
                                        <p className="text-white">{profileData.current_role}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Experience Card */}
                        <motion.div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 shadow-xl" variants={fadeUpVariant}>
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                                <Briefcase className="text-purple-500" size={20} /> Professional Experience
                            </h2>
                            {getExperience().length > 0 ? (
                                <div className="space-y-6">
                                    {getExperience().map((exp: any, i: number) => (
                                        <div key={i} className="pl-4 border-l-2 border-purple-500/50">
                                            <h3 className="text-lg font-semibold text-white">{exp.role || exp.title || 'Role'}</h3>
                                            <p className="text-gray-400 mb-2">{exp.company || exp.company_name || 'Company'}</p>
                                            <p className="text-sm text-gray-300">{exp.description || 'No description provided.'}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No experience data available.</p>
                            )}
                        </motion.div>

                        {/* Education Card */}
                        <motion.div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 shadow-xl" variants={fadeUpVariant}>
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                                <GraduationCap className="text-green-500" size={20} /> Education
                            </h2>
                            {getEducation().length > 0 ? (
                                <div className="space-y-6">
                                    {getEducation().map((edu: any, i: number) => (
                                        <div key={i} className="pl-4 border-l-2 border-green-500/50">
                                            <h3 className="text-lg font-semibold text-white">{edu.degree || edu.course || 'Degree'}</h3>
                                            <p className="text-gray-400">{edu.institution || edu.university || 'Institution'}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No education data available.</p>
                            )}
                        </motion.div>

                        <motion.div className="flex justify-end mt-4" variants={fadeUpVariant}>
                            <button
                                className="border border-purple-500 text-purple-400 hover:bg-purple-900/30 px-6 py-2 rounded-lg transition-colors font-semibold"
                                onClick={() => navigate({ to: '/profile-builder' })}
                            >
                                Edit Profile Data
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </DashboardLayout>
    );
}

export default Profile;
