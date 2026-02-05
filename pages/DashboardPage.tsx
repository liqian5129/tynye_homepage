import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_NOTES, MOCK_INSIGHTS } from '../services/mockData';
import Button from '../components/Button';
import { User, CreditCard, BookOpen, Search, Download, FileText, CheckSquare, Square, HardDrive, Cpu, Layers, Calendar, Hash, FileCheck, ArrowLeft, ChevronDown, Edit2, Globe, Target, PenTool, Book, ChevronRight, ChevronLeft, X, Smartphone, Mic, Image as ImageIcon, MessageCircle, PlayCircle, Clock, Lightbulb, Sparkles, Folder, Tag, Code, ListFilter, Play, Pause } from 'lucide-react';
import { Note, NoteType, Insight } from '../types';

type Tab = 'notes' | 'account' | 'insights';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('notes');
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [insights, setInsights] = useState<Insight[]>(MOCK_INSIGHTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'date' | 'book' | 'tag'>('date');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedNote, setExpandedNote] = useState<Note | null>(null);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [activeInsightExportId, setActiveInsightExportId] = useState<string | null>(null);

  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);

  // Profile Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    ageIndex: 2, // Default: 25-34
    genderIndex: 3, // Default: Prefer not to say
    languageIndex: 0, // Default: First option
    genreIndices: [1, 3, 6], // Default selection
    purposeIndices: [0, 2], // Default: Professional Growth & Casual Reading
    styleIndex: 1 
  });

  const STEPS = [
    { key: 'ageIndex', labelKey: 'ageGroup', optionsKey: 'age', multi: false },
    { key: 'genderIndex', labelKey: 'gender', optionsKey: 'gender', multi: false },
    { key: 'languageIndex', labelKey: 'readingLanguage', optionsKey: 'language', multi: false },
    { key: 'genreIndices', labelKey: 'favoriteGenres', optionsKey: 'genres', multi: true },
    { key: 'purposeIndices', labelKey: 'readingPurpose', optionsKey: 'purpose', multi: true },
    { key: 'styleIndex', labelKey: 'writingStyle', optionsKey: 'style', multi: false },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMultiOption = (key: string, index: number) => {
    setProfile(prev => {
      // @ts-ignore
      const currentIndices = prev[key] as number[];
      const newSet = new Set(currentIndices);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return { ...prev, [key]: Array.from(newSet) };
    });
  };

  const handleOptionSelect = (optionIndex: number) => {
    const currentStepConfig = STEPS[currentStep];
    
    if (currentStepConfig.multi) {
      toggleMultiOption(currentStepConfig.key, optionIndex);
    } else {
      setProfile(prev => ({ ...prev, [currentStepConfig.key]: optionIndex }));
      if (currentStep < STEPS.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setIsTransitioning(false);
        }, 300);
      } else {
        setIsTransitioning(true);
        setTimeout(() => {
          handleSaveProfile();
          setIsTransitioning(false);
        }, 300);
      }
    }
  };

  const handleNextStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSaveProfile();
      }
      setIsTransitioning(false);
    }, 200);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handleSaveProfile = () => {
    setIsWizardOpen(false);
  };

  const openWizard = () => {
    setCurrentStep(0);
    setIsWizardOpen(true);
  };

  const filteredNotes = notes.filter(note => {
    if (activeTab === 'notes') {
    } else if (activeTab === 'account' || activeTab === 'insights') {
       return false;
    }

    if (viewMode === 'book' && selectedBook) {
      if (note.bookTitle !== selectedBook) return false;
    }

    if (viewMode === 'tag' && selectedTag) {
      if (!note.tags.includes(selectedTag)) return false;
    }

    if (dateStart) {
      if (note.date < dateStart) return false;
    }
    if (dateEnd) {
      if (note.date > dateEnd) return false;
    }

    const searchLower = searchQuery.toLowerCase();
    return (
      note.content.toLowerCase().includes(searchLower) || 
      note.bookTitle.toLowerCase().includes(searchLower) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  const toggleSelectNote = (id: string) => {
    const newSelected = new Set(selectedNotes);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedNotes(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedNotes.size === filteredNotes.length) {
      setSelectedNotes(new Set());
    } else {
      setSelectedNotes(new Set(filteredNotes.map(n => n.id)));
    }
  };

  const handleResetFilter = () => {
    setDateStart('');
    setDateEnd('');
  };

  const handleExport = (format: 'pdf' | 'md' | 'html') => {
    if (selectedNotes.size === 0 && !expandedNote) return;
    const notesToExport = expandedNote 
      ? [expandedNote] 
      : notes.filter(n => selectedNotes.has(n.id));

    const idsToMark = new Set(notesToExport.map(n => n.id));
    setNotes(prev => prev.map(n => idsToMark.has(n.id) ? { ...n, exported: true } : n));

    if (format === 'md') {
      const contentToExport = notesToExport
        .map(n => `Title: ${n.bookTitle}\nDate: ${n.date}\nTags: ${n.tags.join(', ')}\nContent: "${n.content}"\nSub-notes: ${n.userSubNotes}`)
        .join('\n\n-------------------\n\n');
      const blob = new Blob([contentToExport], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tynye_export_${new Date().toISOString().slice(0,10)}.md`;
      a.click();
    } else if (format === 'html') {
       const htmlContent = `<!DOCTYPE html><html><body style="font-family:serif;background:#F3F1EA;padding:40px;">${notesToExport.map(n => `<div><h1>${n.bookTitle}</h1><p>${n.content}</p></div>`).join('')}</body></html>`;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tynye_export_${new Date().toISOString().slice(0,10)}.html`;
      a.click();
    } else {
      window.print();
    }
    setIsExportDropdownOpen(false);
  };

  const handleAudioExport = (note: Note) => {
    if (!note.audioUrl) return;
    const filename = `tynye_Recording_${note.bookTitle.replace(/\s+/g, '_')}_${note.date}.mp3`;
    const link = document.createElement('a');
    link.href = note.audioUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportInsight = (insight: Insight, format: 'md' | 'html' | 'pdf') => {
    const filename = `tynye_insight_${insight.date}_${insight.id}`;
    if (format === 'md') {
      const blob = new Blob([insight.content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.md`;
      a.click();
    } else if (format === 'html') {
      const blob = new Blob([insight.content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.html`;
      a.click();
    } else if (format === 'pdf') {
       window.print();
    }
    setActiveInsightExportId(null);
  };

  const getGroupedNotes = () => {
    const groups: { [key: string]: Note[] } = {};
    filteredNotes.forEach(note => {
      const key = note.date; 
      if (!groups[key]) groups[key] = [];
      groups[key].push(note);
    });
    const sortedKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));
    return { groups, sortedKeys };
  };

  const getBookFolders = () => {
    const folders: { [key: string]: number } = {};
    notes.forEach(note => {
       folders[note.bookTitle] = (folders[note.bookTitle] || 0) + 1;
    });
    return Object.entries(folders).map(([title, count]) => ({ title, count }));
  };

  const getTagStats = () => {
    const stats: { [key: string]: number } = {};
    notes.forEach(note => {
      note.tags.forEach(tag => {
        stats[tag] = (stats[tag] || 0) + 1;
      });
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  };

  const { groups, sortedKeys } = getGroupedNotes();
  const bookFolders = getBookFolders();
  const tagStats = getTagStats();

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setExpandedNote(null);
    setSelectedNotes(new Set());
    setSearchQuery('');
    setSelectedBook(null);
    setSelectedTag(null);
    setIsExportDropdownOpen(false);
    setActiveInsightExportId(null);
  };

  useEffect(() => {
     if (viewMode === 'date') {
       setSelectedBook(null);
       setSelectedTag(null);
     } else if (viewMode === 'book') {
       setSelectedTag(null);
     } else if (viewMode === 'tag') {
       setSelectedBook(null);
     }
  }, [viewMode]);

  const ExportButton = ({ className = "" }: { className?: string }) => (
    <div className={`relative inline-block text-left ${className}`}>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
        className="h-9 px-3 flex items-center border-gray-200 shadow-sm"
      >
        <Download className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
        <span className="text-gray-700">{t.dashboard.notes.export}</span>
        <ChevronDown className={`w-3.5 h-3.5 ml-1.5 text-gray-400 transition-transform ${isExportDropdownOpen ? 'rotate-180' : ''}`} />
      </Button>
      {isExportDropdownOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsExportDropdownOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40 animate-fade-in overflow-hidden">
            <div className="py-1">
              <button onClick={() => handleExport('md')} className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors whitespace-nowrap"><FileText className="w-4 h-4 mr-3 text-brand-500" />{t.dashboard.notes.exportMd}</button>
              <button onClick={() => handleExport('html')} className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors border-t border-gray-50 whitespace-nowrap"><Code className="w-4 h-4 mr-3 text-brand-500" />{t.dashboard.notes.exportHtml}</button>
              <button onClick={() => handleExport('pdf')} className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors border-t border-gray-50 whitespace-nowrap"><FileCheck className="w-4 h-4 mr-3 text-brand-500" />{t.dashboard.notes.exportPdf}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const SummaryCard = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
    <div className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col h-full hover:border-brand-200 hover:shadow-sm transition-all shadow-sm">
      <div className="flex items-center text-gray-400 mb-3">
        <Icon className="w-4 h-4 mr-2" />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="font-medium text-gray-900 text-lg break-words leading-snug flex-1">{value}</div>
    </div>
  );

  const getNoteTypeIcon = (type: NoteType) => {
    switch (type) {
      case 'text': return <FileText className="w-4 h-4 text-brand-600" />;
      case 'audio': return <Mic className="w-4 h-4 text-blue-500" />;
      case 'excerpt': return <ImageIcon className="w-4 h-4 text-purple-500" />;
      case 'chat': return <MessageCircle className="w-4 h-4 text-green-500" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getNoteTypeLabel = (type: NoteType) => {
    // @ts-ignore
    return t.dashboard.notes.types[type] || type;
  };

  const ProfileWizard = () => {
    const stepConfig = STEPS[currentStep];
    const options = (t.dashboard.profile.options as any)[stepConfig.optionsKey];
    const label = (t.dashboard.profile as any)[stepConfig.labelKey];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div><h3 className="text-lg font-bold text-gray-900">{t.dashboard.profile.wizard.title}</h3><p className="text-sm text-brand-600 font-medium mt-1">{t.dashboard.profile.wizard.step} {currentStep + 1} / {STEPS.length}</p></div>
            <button onClick={() => setIsWizardOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
          </div>
          <div className="w-full bg-gray-100 h-1"><div className="bg-brand-600 h-1 transition-all duration-300" style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}></div></div>
          <div className="flex-1 overflow-hidden relative bg-white">
            <div className={`absolute inset-0 p-8 overflow-y-auto transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{label}</h2>
              <div className={`grid gap-4 ${stepConfig.multi ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                {options.map((option: string, idx: number) => {
                  let isSelected = false;
                  if (stepConfig.multi) isSelected = (profile as any)[stepConfig.key].includes(idx);
                  else isSelected = (profile as any)[stepConfig.key] === idx;
                  return (
                    <button key={idx} onClick={() => handleOptionSelect(idx)} className={`relative p-4 rounded-xl text-left transition-all duration-200 border-2 ${isSelected ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-md shadow-brand-100' : 'border-gray-100 bg-white text-gray-600 hover:border-brand-200 hover:bg-gray-50'}`}><div className="flex items-center justify-between"><span className="font-medium text-lg">{option}</span>{isSelected && <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center text-white"><CheckSquare className="w-3.5 h-3.5" /></div>}</div></button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center z-10 relative"><Button variant="ghost" onClick={handlePrevStep} disabled={currentStep === 0} className={`${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}><ChevronLeft className="w-4 h-4 mr-2" />{t.dashboard.profile.wizard.prev}</Button>{stepConfig.multi ? <Button onClick={handleNextStep}>{currentStep === STEPS.length - 1 ? t.dashboard.profile.wizard.finish : t.dashboard.profile.wizard.next}{currentStep !== STEPS.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}</Button> : <span className="text-xs text-gray-400"></span>}</div>
        </div>
      </div>
    );
  };

  const renderNoteContent = (note: Note) => {
    switch (note.type) {
      case 'audio':
      case 'chat':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 animate-fade-in shadow-sm">
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 hover:scale-105 transition-all shadow-md"><Play className="w-4 h-4 fill-white" /></button>
                <div className="md:hidden flex-1 text-sm font-mono text-gray-600 text-right">{note.audioDuration || '04:20'}</div>
              </div>
              <div className="flex-1 w-full h-1 bg-gray-200 rounded-full relative overflow-hidden"><div className="absolute top-0 left-0 h-full bg-brand-500 w-1/3 rounded-full"></div></div>
              <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
                <div className="hidden md:block text-sm font-mono text-gray-600">01:23 / {note.audioDuration || '04:20'}</div>
                {note.audioUrl && <button onClick={() => handleAudioExport(note)} className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold transition-all border border-gray-200 shadow-sm active:scale-95"><Download className="w-3.5 h-3.5" /><span>{t.dashboard.notes.exportAudio}</span></button>}
              </div>
            </div>
            {note.timestamps && note.timestamps.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center"><Clock className="w-3 h-3 mr-2 text-brand-500" />{t.dashboard.notes.fields.timestamps}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                   {note.timestamps.map((ts, i) => (
                     <div key={i} className="group flex items-center p-2.5 bg-gray-50/50 rounded-xl border border-transparent hover:border-brand-200 hover:bg-white transition-all cursor-pointer"><span className="text-xs font-mono text-brand-600 font-bold mr-3">{ts.split(' - ')[0]}</span><span className="text-xs text-gray-600 group-hover:text-gray-900 truncate">{ts.split(' - ')[1]}</span></div>
                   ))}
                </div>
              </div>
            )}
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">{t.dashboard.notes.fields.transcription}</h4>
              <div className="prose prose-brand prose-sm max-w-none text-gray-900 leading-[1.8] font-serif text-lg">{note.content}</div>
            </div>
            {note.userSubNotes && <div className="bg-brand-50/30 p-6 rounded-2xl border border-brand-100/50"><h4 className="text-[10px] font-bold text-brand-600 uppercase tracking-[0.2em] mb-3">{t.dashboard.notes.fields.subNotes}</h4><p className="text-brand-900 text-lg leading-relaxed italic">"{note.userSubNotes}"</p></div>}
          </div>
        );
      case 'excerpt':
        return (
          <div className="space-y-6">
            {note.originalImage && <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm"><img src={note.originalImage} alt="Scanned" className="w-full object-cover max-h-80" /></div>}
            <div><h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{t.dashboard.notes.fields.ocrText}</h4><p className="text-2xl font-serif text-gray-900 leading-relaxed border-l-4 border-brand-300 pl-6 py-2">"{note.content}"</p></div>
            {note.userSubNotes && <div className="bg-brand-50 p-6 rounded-xl border border-brand-100"><h4 className="text-sm font-bold text-brand-800 mb-2">{t.dashboard.notes.fields.subNotes}</h4><p className="text-brand-900">{note.userSubNotes}</p></div>}
          </div>
        );
      case 'text':
      default:
        return (
          <div className="space-y-6">
            <div className="relative pl-6 border-l-4 border-brand-300"><p className="text-2xl md:text-3xl font-serif text-gray-900 leading-relaxed">"{note.content}"</p></div>
            {note.userSubNotes && <div className="bg-brand-50 p-6 rounded-xl border border-brand-100"><h4 className="text-sm font-bold text-brand-800 mb-2">{t.dashboard.notes.fields.subNotes}</h4><p className="text-brand-900">{note.userSubNotes}</p></div>}
          </div>
        );
    }
  };

  const renderContent = () => {
    if (activeTab === 'account') {
      const options = t.dashboard.profile.options;
      return (
        <div className="space-y-6 animate-fade-in pb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t.dashboard.menuAccount}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-4 bg-green-50 rounded-xl border border-green-100"><div className="flex items-center space-x-3 mb-2"><div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600"><Layers className="w-4 h-4" /></div><span className="text-sm font-medium text-gray-600">{t.dashboard.stats.plan}</span></div><div className="text-2xl font-bold text-gray-900">Early Bird</div></div>
               <div className="p-4 bg-purple-50 rounded-xl border border-purple-100"><div className="flex items-center space-x-3 mb-2"><div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"><HardDrive className="w-4 h-4" /></div><span className="text-sm font-medium text-gray-600">{t.dashboard.stats.storage}</span></div><div className="text-2xl font-bold text-gray-900">2.4 GB</div></div>
               <div className="p-4 bg-blue-50 rounded-xl border border-blue-100"><div className="flex items-center space-x-3 mb-2"><div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><Cpu className="w-4 h-4" /></div><span className="text-sm font-medium text-gray-600">{t.dashboard.stats.tokens}</span></div><div className="text-2xl font-bold text-gray-900">145k / 10M</div></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
             <h3 className="font-semibold text-gray-900 mb-4">{t.dashboard.device.title}</h3>
             <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-200 rounded-xl gap-6 bg-paper/20">
                <div className="flex items-center space-x-4"><div className="w-10 h-16 bg-gray-800 rounded-md shadow-lg flex items-center justify-center"><Smartphone className="w-5 h-5 text-gray-600" /></div><div><p className="font-medium text-gray-900">{t.dashboard.device.name}</p><p className="text-sm text-gray-500">{t.dashboard.device.lastSync}</p></div></div>
                <div className="flex-1 max-w-md w-full"><div className="flex justify-between text-sm mb-2"><span className="text-gray-500">{t.dashboard.device.storage}</span><span className="text-gray-900 font-medium">1.2 GB / 8.0 GB</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-brand-500 h-2 rounded-full shadow-sm" style={{ width: '15%' }}></div></div></div>
                <div className="flex items-center text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full border border-green-100"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>{t.dashboard.device.status}</div>
             </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6"><div><h2 className="text-xl font-bold text-gray-900">{t.dashboard.profile.title}</h2><p className="text-sm text-gray-500 mt-1">{t.dashboard.profile.subtitle}</p></div><Button onClick={openWizard} className="flex items-center"><Edit2 className="w-4 h-4 mr-2" />{t.dashboard.profile.edit}</Button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <SummaryCard label={t.dashboard.profile.ageGroup} value={options.age[profile.ageIndex]} icon={Calendar} />
               <SummaryCard label={t.dashboard.profile.gender} value={options.gender[profile.genderIndex]} icon={User} />
               <SummaryCard label={t.dashboard.profile.readingLanguage} value={options.language[profile.languageIndex]} icon={Globe} />
               <SummaryCard label={t.dashboard.profile.favoriteGenres} value={profile.genreIndices.map(i => options.genres[i]).join(', ')} icon={Book} />
               <SummaryCard label={t.dashboard.profile.readingPurpose} value={profile.purposeIndices.map(i => options.purpose[i]).join(', ')} icon={Target} />
               <SummaryCard label={t.dashboard.profile.writingStyle} value={options.style[profile.styleIndex]} icon={PenTool} />
            </div>
          </div>
        </div>
      );
    }
    if (activeTab === 'insights') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px] flex flex-col animate-fade-in">
          <div className="p-6 border-b border-gray-100"><h2 className="text-2xl font-bold text-gray-900 flex items-center"><Sparkles className="w-6 h-6 mr-3 text-brand-600" />{t.dashboard.insights.title}</h2><p className="text-gray-500 text-sm mt-1">{t.dashboard.insights.subtitle}</p></div>
          <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
             {insights.length === 0 ? (<div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400"><Lightbulb className="w-12 h-12 mb-4 opacity-30" /><p>{t.dashboard.insights.noInsights}</p></div>) : (
               insights.map(insight => (
                 <div key={insight.id} className="bg-white rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all p-6 flex flex-col relative shadow-sm">
                    <div className="mb-4">
                       <div className="flex justify-between items-start"><span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-1 rounded-full mb-3 inline-block">Report</span><div className="relative"><button onClick={() => setActiveInsightExportId(activeInsightExportId === insight.id ? null : insight.id)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"><Download className="w-4 h-4" /></button>
                            {activeInsightExportId === insight.id && (<><div className="fixed inset-0 z-30" onClick={() => setActiveInsightExportId(null)}></div><div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40 animate-fade-in overflow-hidden"><button onClick={() => handleExportInsight(insight, 'md')} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center whitespace-nowrap"><FileText className="w-4 h-4 mr-3 text-brand-500" /> {t.dashboard.notes.exportMd}</button><button onClick={() => handleExportInsight(insight, 'html')} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center border-t border-gray-50 whitespace-nowrap"><Code className="w-4 h-4 mr-3 text-brand-500" /> {t.dashboard.notes.exportHtml}</button><button onClick={() => handleExportInsight(insight, 'pdf')} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center border-t border-gray-50 whitespace-nowrap"><FileCheck className="w-4 h-4 mr-3 text-brand-500" /> {t.dashboard.notes.exportPdf}</button></div></>)}
                          </div></div><h3 className="text-xl font-bold text-gray-900 mb-2">{insight.title}</h3><p className="text-sm text-gray-500 flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" />{insight.date}</p>
                    </div>
                    <div className="flex-1 mb-6"><p className="text-gray-700 leading-relaxed text-sm line-clamp-5">{insight.content}</p></div>
                    <div className="border-t border-gray-100 pt-4 text-xs text-gray-500 space-y-2"><div className="flex justify-between"><span className="font-medium text-gray-600">{t.dashboard.insights.source}</span><span>{insight.sourceNoteCount} notes</span></div><div className="flex justify-between"><span className="font-medium text-gray-600">{t.dashboard.insights.range}</span><span>{insight.dateRange}</span></div><div className="pt-2 flex flex-wrap gap-1">{insight.tags.map(tag => (<span key={tag} className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">#{tag}</span>))}</div></div>
                 </div>
               )))}
          </div>
        </div>
      );
    }
    if (expandedNote) {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px] flex flex-col animate-fade-in">
           <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10 rounded-t-2xl"><div className="flex items-center space-x-4"><button onClick={() => { setExpandedNote(null); setIsExportDropdownOpen(false); }} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"><ArrowLeft className="w-5 h-5" /></button><div><h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">{getNoteTypeIcon(expandedNote.type)}{t.dashboard.notes.details}</h2><p className="text-sm text-gray-500 flex items-center"><BookOpen className="w-3.5 h-3.5 mr-1" />{expandedNote.bookTitle}<span className="mx-2">•</span><Calendar className="w-3.5 h-3.5 mr-1" />{expandedNote.date}</p></div></div><div className="flex items-center space-x-3"><ExportButton /></div></div>
           <div className="p-8 max-w-4xl mx-auto w-full"><div className="mb-8"><div className="flex flex-wrap gap-2 mb-8">{expandedNote.tags.map(tag => (<span key={tag} className="text-xs text-brand-700 bg-brand-50 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider border border-brand-100 shadow-sm">#{tag}</span>))}</div>{renderNoteContent(expandedNote)}</div></div>
        </div>
      );
    }
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px] flex flex-col">
        <div className="p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
          <div><h2 className="text-2xl font-bold text-gray-900 flex items-center">{(selectedBook || selectedTag) && (<button onClick={() => { setSelectedBook(null); setSelectedTag(null); }} className="mr-3 hover:bg-gray-100 p-1.5 rounded-full transition-colors"><ArrowLeft className="w-5 h-5 text-gray-500" /></button>)}{activeTab === 'notes' && (selectedBook ? selectedBook : selectedTag ? `${t.dashboard.notes.allTags} / #${selectedTag}` : t.dashboard.notes.title)}</h2><p className="text-gray-500 text-sm mt-1">{activeTab === 'notes' && !selectedBook && !selectedTag && t.dashboard.notes.subtitle}{selectedBook && `${t.dashboard.notes.folders} / ${selectedBook}`}{selectedTag && `${t.dashboard.notes.itemsCount} with #${selectedTag}`}</p></div>
          <div className="flex flex-wrap items-center gap-3"><div className="flex items-center bg-gray-100 p-1 rounded-lg h-9"><button onClick={() => setViewMode('date')} className={`px-3 h-full text-xs font-medium rounded-md flex items-center transition-all ${viewMode === 'date' ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Calendar className="w-3.5 h-3.5 mr-1.5" />{t.dashboard.viewOptions.date}</button><button onClick={() => setViewMode('book')} className={`px-3 h-full text-xs font-medium rounded-md flex items-center transition-all ${viewMode === 'book' ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Folder className="w-3.5 h-3.5 mr-1.5" />{t.dashboard.viewOptions.book}</button><button onClick={() => setViewMode('tag')} className={`px-3 h-full text-xs font-medium rounded-md flex items-center transition-all ${viewMode === 'tag' ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Tag className="w-3.5 h-3.5 mr-1.5" />{t.dashboard.viewOptions.tag}</button></div><div className="h-6 w-px bg-gray-200 hidden sm:block"></div>{selectedNotes.size > 0 && (<ExportButton />)}</div>
        </div>
        {viewMode === 'book' && !selectedBook && (<div className="p-6 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade-in">{bookFolders.map((folder, idx) => (<div key={idx} onClick={() => setSelectedBook(folder.title)} className="bg-paper/10 rounded-xl border border-gray-200 p-6 cursor-pointer hover:bg-white hover:shadow-lg hover:border-brand-200 transition-all group flex flex-col items-center justify-center text-center aspect-[4/3]"><Folder className="w-16 h-16 text-brand-200 group-hover:text-brand-500 transition-colors mb-4" /><h3 className="font-bold text-gray-900 line-clamp-2 mb-1">{folder.title}</h3><span className="text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded-full border border-gray-100 group-hover:border-brand-100 group-hover:text-brand-600 transition-colors">{folder.count} {t.dashboard.notes.itemsCount}</span></div>))}</div>)}
        {viewMode === 'tag' && !selectedTag && (<div className="p-6 animate-fade-in"><div className="flex items-center text-gray-500 mb-6 font-medium"><Tag className="w-5 h-5 mr-2" />{t.dashboard.notes.allTags} <span className="ml-2 text-sm text-gray-400">{tagStats.length}</span></div><div className="flex flex-col gap-3">{tagStats.map(([tag, count], idx) => (<div key={idx} onClick={() => setSelectedTag(tag)} className="bg-paper/10 rounded-xl border border-gray-100 p-4 cursor-pointer hover:bg-white hover:shadow-md hover:border-brand-200 transition-all flex items-center justify-between group"><div className="flex items-center space-x-3"><div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-brand-500 group-hover:border-brand-200 transition-colors"><Hash className="w-4 h-4" /></div><span className="font-semibold text-gray-700 group-hover:text-brand-700 text-lg">{tag}</span></div><div className="flex items-center space-x-2"><span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100">{count}</span><ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-400" /></div></div>))}</div></div>)}
        {((viewMode === 'date') || (viewMode === 'book' && selectedBook) || (viewMode === 'tag' && selectedTag)) && (
          <><div className="p-4 bg-paper/20 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center relative z-20"><div className="relative flex-1 w-full" ref={filterRef}><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="text" placeholder={t.dashboard.notes.search} className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /><button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors ${isFilterOpen || (dateStart || dateEnd) ? 'text-brand-600 bg-brand-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}><ListFilter className="w-4 h-4" /></button>
                 {isFilterOpen && (<div className="absolute top-full right-0 mt-2 w-full sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 p-5 z-50 animate-fade-in"><h3 className="font-medium text-gray-900 mb-4">{t.dashboard.notes.filter.title}</h3><div className="flex items-center gap-2 mb-6"><div className="relative flex-1"><label className="text-xs text-gray-500 mb-1 block">{t.dashboard.notes.filter.startDate}</label><input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" /></div><span className="text-gray-400 mt-5">{t.dashboard.notes.filter.to}</span><div className="relative flex-1"><label className="text-xs text-gray-500 mb-1 block">{t.dashboard.notes.filter.endDate}</label><input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" /></div></div><div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2"><button onClick={handleResetFilter} className="text-gray-500 text-sm hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">{t.dashboard.notes.filter.reset}</button><Button size="sm" onClick={() => setIsFilterOpen(false)}>{t.dashboard.notes.filter.search}</Button></div></div>)}
               </div><div className="flex items-center space-x-2 text-sm text-gray-600 w-full sm:w-auto justify-end"><button onClick={toggleSelectAll} className="flex items-center hover:text-brand-600 px-2 py-1 transition-colors">{selectedNotes.size > 0 && selectedNotes.size === filteredNotes.length ? <CheckSquare className="w-4 h-4 mr-2" /> : <Square className="w-4 h-4 mr-2" />}{t.dashboard.notes.selectAll}</button></div></div>
            <div className="divide-y divide-gray-100 flex-1 overflow-y-auto animate-fade-in relative z-10">
               {sortedKeys.length === 0 ? (<div className="flex flex-col items-center justify-center h-64 text-gray-400"><BookOpen className="w-12 h-12 mb-4 opacity-20" /><p>{t.dashboard.notes.noNotes}</p>{(dateStart || dateEnd) && (<button onClick={handleResetFilter} className="mt-2 text-brand-600 hover:underline text-sm">{t.dashboard.notes.filter.reset}</button>)}</div>) : (
                 sortedKeys.map(groupKey => (
                   <div key={groupKey}>{viewMode === 'date' && (<div className="bg-paper/50 px-6 py-2 border-b border-gray-100 sticky top-0 backdrop-blur-sm z-10 flex items-center justify-between"><h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center"><Calendar className="w-3 h-3 mr-2" />{groupKey}</h3><span className="text-xs text-gray-400">{groups[groupKey].length} notes</span></div>)}
                     <div className="p-4 grid gap-4 w-full grid-cols-1">
                       {groups[groupKey].map(note => (
                         <div key={note.id} className={`bg-white rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer group flex flex-col overflow-hidden relative ${selectedNotes.has(note.id) ? 'ring-2 ring-brand-500 border-transparent' : ''}`} onClick={() => setExpandedNote(note)}>
                            <div className="p-4 pb-2 flex justify-between items-start"><div className="flex items-start space-x-2"><div className="p-1.5 bg-gray-50 rounded-lg">{getNoteTypeIcon(note.type)}</div><div><div className="text-xs font-bold text-gray-500 uppercase tracking-wide">{getNoteTypeLabel(note.type)}</div><div className="text-xs text-gray-400 mt-0.5">{note.date}</div></div></div><div className="max-w-[50%] text-right"><div className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block truncate max-w-full">{note.bookTitle}</div></div></div>
                            <div className="px-4 py-2 flex-1"><p className="text-gray-800 text-sm line-clamp-3 leading-relaxed">{note.content}</p></div>
                            <div className="px-4 py-3 bg-gray-50 mt-2 flex justify-between items-center border-t border-gray-100"><div className="flex gap-1 overflow-hidden">{note.tags.slice(0, 4).map(tag => (<span key={tag} className="text-[10px] text-gray-600 bg-white border border-gray-200 px-1.5 py-0.5 rounded">#{tag}</span>))}{note.tags.length > 4 && <span className="text-[10px] text-gray-400">+{note.tags.length - 4}</span>}</div><div className="flex items-center space-x-3"><div className="flex items-center text-[10px] text-green-600 font-medium"><CheckSquare className="w-3 h-3 mr-1" />{t.dashboard.notes.fields.synced}</div><button className="text-gray-400 hover:text-brand-600 transition-colors p-1" onClick={(e) => { e.stopPropagation(); toggleSelectNote(note.id); }}>{selectedNotes.has(note.id) ? <CheckSquare className="w-4 h-4 text-brand-600" /> : <Square className="w-4 h-4" />}</button></div></div>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))
               )}
            </div></>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-paper pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 sticky top-24">
              <div className="flex items-center space-x-3 mb-6"><div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 text-lg font-bold">{user?.name.charAt(0).toUpperCase()}</div><div className="overflow-hidden"><h3 className="font-bold text-gray-900 truncate">{user?.name}</h3><p className="text-xs text-gray-500 truncate">{user?.email}</p></div></div>
              <nav className="space-y-1">
                <button onClick={() => handleTabChange('account')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'account' ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}><User className="w-5 h-5" /><span>{t.dashboard.menuAccount}</span></button>
                <div className="h-px bg-gray-100 my-2"></div>
                <button onClick={() => handleTabChange('notes')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'notes' ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}><BookOpen className="w-5 h-5" /><span>{t.dashboard.menuNotes}</span></button>
                <button onClick={() => handleTabChange('insights')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'insights' ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}><Lightbulb className="w-5 h-5" /><span>{t.dashboard.menuInsights}</span></button>
              </nav>
            </div>
          </div>
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
      {isWizardOpen && <ProfileWizard />}
    </div>
  );
};

export default DashboardPage;