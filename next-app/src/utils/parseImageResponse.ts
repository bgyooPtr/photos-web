import { Image } from '../models/Image';
import { Metadata } from '../models/Metadata';
import { ExifDateTime } from 'exiftool-vendored';

const parseMetadata = (data: any): Metadata => ({
  SourceFile: data?.SourceFile,
  errors: data?.errors,
  tz: data?.tz,
  tzSource: data?.tzSource,
  GPSAltitude: data?.GPSAltitude,
  GPSLatitude: data?.GPSLatitude,
  GPSLongitude: data?.GPSLongitude,
  GPSPosition: data?.GPSPosition,
  Orientation: data?.Orientation,
  ExifToolVersion: data?.ExifToolVersion,
  FileName: data?.FileName,
  Directory: data?.Directory,
  FileSize: data?.FileSize,
  FileModifyDate: data?.FileModifyDate ? ExifDateTime.fromJSON(data?.FileModifyDate) : undefined,
  FileAccessDate: data?.FileAccessDate ? ExifDateTime.fromJSON(data?.FileAccessDate) : undefined,
  FileInodeChangeDate: data?.FileInodeChangeDate ? ExifDateTime.fromJSON(data?.FileInodeChangeDate) : undefined,
  FilePermissions: data?.FilePermissions,
  FileType: data?.FileType,
  FileTypeExtension: data?.FileTypeExtension,
  MIMEType: data?.MIMEType,
  ExifByteOrder: data?.ExifByteOrder,
  Make: data?.Make,
  Model: data?.Model,
  Software: data?.Software,
  ModifyDate: data?.ModifyDate ? ExifDateTime.fromJSON(data?.ModifyDate) : undefined,
  Artist: data?.Artist,
  JpgFromRawStart: data?.JpgFromRawStart,
  JpgFromRawLength: data?.JpgFromRawLength,
  YCbCrPositioning: data?.YCbCrPositioning,
  ImageWidth: data?.ImageWidth,
  ImageHeight: data?.ImageHeight,
  BitsPerSample: data?.BitsPerSample,
  Compression: data?.Compression,
  PhotometricInterpretation: data?.PhotometricInterpretation,
  SamplesPerPixel: data?.SamplesPerPixel,
  RowsPerStrip: data?.RowsPerStrip,
  XResolution: data?.XResolution,
  YResolution: data?.YResolution,
  PlanarConfiguration: data?.PlanarConfiguration,
  ResolutionUnit: data?.ResolutionUnit,
  CFARepeatPatternDim: data?.CFARepeatPatternDim,
  CFAPattern2: data?.CFAPattern2,
  DistortionCorrectionVersion: data?.DistortionCorrectionVersion,
  DistortionCorrection: data?.DistortionCorrection,
  RadialDistortionCoefficient1: data?.RadialDistortionCoefficient1,
  RadialDistortionCoefficient2: data?.RadialDistortionCoefficient2,
  RadialDistortionCoefficient3: data?.RadialDistortionCoefficient3,
  VignetteCorrectionVersion: data?.VignetteCorrectionVersion,
  VignetteCoefficient1: data?.VignetteCoefficient1,
  VignetteCoefficient2: data?.VignetteCoefficient2,
  VignetteCoefficient3: data?.VignetteCoefficient3,
  OtherImageStart: data?.OtherImageStart,
  OtherImageLength: data?.OtherImageLength,
  SubfileType: data?.SubfileType,
  StripOffsets: data?.StripOffsets,
  StripByteCounts: data?.StripByteCounts,
  ThumbnailOffset: data?.ThumbnailOffset,
  ThumbnailLength: data?.ThumbnailLength,
  ReferenceBlackWhite: data?.ReferenceBlackWhite,
  CreatorTool: data?.CreatorTool,
  Rating: data?.Rating,
  Exposure2012: data?.Exposure2012,
  Highlights2012: data?.Highlights2012,
  Shadows2012: data?.Shadows2012,
  LuminanceSmoothing: data?.LuminanceSmoothing,
  LuminanceNoiseReductionDetail: data?.LuminanceNoiseReductionDetail,
  LuminanceNoiseReductionContrast: data?.LuminanceNoiseReductionContrast,
  ColorNoiseReduction: data?.ColorNoiseReduction,
  ColorNoiseReductionDetail: data?.ColorNoiseReductionDetail,
  ColorNoiseReductionSmoothness: data?.ColorNoiseReductionSmoothness,
  SharpenRadius: data?.SharpenRadius,
  SharpenDetail: data?.SharpenDetail,
  SharpenEdgeMasking: data?.SharpenEdgeMasking,
  Contrast2012: data?.Contrast2012,
  Clarity2012: data?.Clarity2012,
  Texture: data?.Texture,
  CameraProfile: data?.CameraProfile,
  HueAdjustmentRed: data?.HueAdjustmentRed,
  HueAdjustmentOrange: data?.HueAdjustmentOrange,
  HueAdjustmentYellow: data?.HueAdjustmentYellow,
  SaturationAdjustmentRed: data?.SaturationAdjustmentRed,
  SaturationAdjustmentOrange: data?.SaturationAdjustmentOrange,
  SaturationAdjustmentYellow: data?.SaturationAdjustmentYellow,
  LuminanceAdjustmentRed: data?.LuminanceAdjustmentRed,
  LuminanceAdjustmentOrange: data?.LuminanceAdjustmentOrange,
  LuminanceAdjustmentYellow: data?.LuminanceAdjustmentYellow,
  Copyright: data?.Copyright,
  ExposureTime: data?.ExposureTime,
  FNumber: data?.FNumber,
  ExposureProgram: data?.ExposureProgram,
  ISO: data?.ISO,
  SensitivityType: data?.SensitivityType,
  RecommendedExposureIndex: data?.RecommendedExposureIndex,
  CreateDate: data?.CreateDate ? ExifDateTime.fromJSON(data?.CreateDate) : undefined,
  OffsetTime: data?.OffsetTime,
  OffsetTimeOriginal: data?.OffsetTimeOriginal,
  OffsetTimeDigitized: data?.OffsetTimeDigitized,
  ExposureCompensation: data?.ExposureCompensation,
  MeteringMode: data?.MeteringMode,
  LightSource: data?.LightSource,
  Flash: data?.Flash,
  FocalLength: data?.FocalLength,
  MakerNoteVersion: data?.MakerNoteVersion,
  Quality: data?.Quality,
  WhiteBalance: data?.WhiteBalance,
  FocusMode: data?.FocusMode,
  FlashSetting: data?.FlashSetting,
  FlashType: data?.FlashType,
  WB_RBLevels: data?.WB_RBLevels,
  ProgramShift: data?.ProgramShift,
  ExposureDifference: data?.ExposureDifference,
  PreviewImageStart: data?.PreviewImageStart,
  PreviewImageLength: data?.PreviewImageLength,
  ExternalFlashExposureComp: data?.ExternalFlashExposureComp,
  FlashExposureBracketValue: data?.FlashExposureBracketValue,
  ExposureBracketValue: data?.ExposureBracketValue,
  CropHiSpeed: data?.CropHiSpeed,
  ExposureTuning: data?.ExposureTuning,
  ColorSpace: data?.ColorSpace,
  VRInfoVersion: data?.VRInfoVersion,
  VibrationReduction: data?.VibrationReduction,
  VRMode: data?.VRMode,
  VRType: data?.VRType,
  ActiveD_Lighting: data?.ActiveD_Lighting,
  PictureControlVersion: data?.PictureControlVersion,
  PictureControlName: data?.PictureControlName,
  PictureControlBase: data?.PictureControlBase,
  PictureControlAdjust: data?.PictureControlAdjust,
  PictureControlQuickAdjust: data?.PictureControlQuickAdjust,
  MidRangeSharpness: data?.MidRangeSharpness,
  Clarity: data?.Clarity,
  Brightness: data?.Brightness,
  Hue: data?.Hue,
  FilterEffect: data?.FilterEffect,
  ToningEffect: data?.ToningEffect,
  ToningSaturation: data?.ToningSaturation,
  TimeZone: data?.TimeZone,
  DaylightSavings: data?.DaylightSavings,
  DateDisplayFormat: data?.DateDisplayFormat,
  ISOExpansion: data?.ISOExpansion,
  ISO2: data?.ISO2,
  ISOExpansion2: data?.ISOExpansion2,
  VignetteControl: data?.VignetteControl,
  AutoDistortionControl: data?.AutoDistortionControl,
  ShutterMode: data?.ShutterMode,
  MechanicalShutterCount: data?.MechanicalShutterCount,
  BlackLevel: data?.BlackLevel,
  ImageSizeRAW: data?.ImageSizeRAW,
  WhiteBalanceFineTune: data?.WhiteBalanceFineTune,
  CropArea: data?.CropArea,
  ColorTemperatureAuto: data?.ColorTemperatureAuto,
  FirmwareVersion51: data?.FirmwareVersion51,
  NEFCompression: data?.NEFCompression,
  BurstGroupID: data?.BurstGroupID,
  LensType: data?.LensType,
  Lens: data?.Lens,
  FlashMode: data?.FlashMode,
  ShootingMode: data?.ShootingMode,
  LensFStops: data?.LensFStops,
  // ContrastCurve: data?.ContrastCurve ? parseBinaryField(data?.ContrastCurve) : undefined,
  ShotInfoVersion: data?.ShotInfoVersion,
  FirmwareVersion: data?.FirmwareVersion,
  FirmwareVersion2: data?.FirmwareVersion2,
  FirmwareVersion3: data?.FirmwareVersion3,
  NumberOffsets: data?.NumberOffsets,
  IntervalShooting: data?.IntervalShooting,
  ImageArea: data?.ImageArea,
  RollAngle: data?.RollAngle,
  PitchAngle: data?.PitchAngle,
  YawAngle: data?.YawAngle,
  NoiseReduction: data?.NoiseReduction,
  ColorBalanceVersion: data?.ColorBalanceVersion,
  LensDataVersion: data?.LensDataVersion,
  LensMountType: data?.LensMountType,
  MaxAperture: data?.MaxAperture,
  FocusDistance: data?.FocusDistance,
  LensPositionAbsolute: data?.LensPositionAbsolute,
  RetouchHistory: data?.RetouchHistory,
  ShutterCount: data?.ShutterCount,
  FlashInfoVersion: data?.FlashInfoVersion,
  FlashSource: data?.FlashSource,
  ExternalFlashFirmware: data?.ExternalFlashFirmware,
  ExternalFlashFlags: data?.ExternalFlashFlags,
  FlashCommanderMode: data?.FlashCommanderMode,
  FlashControlMode: data?.FlashControlMode,
  FlashGNDistance: data?.FlashGNDistance,
  FlashColorFilter: data?.FlashColorFilter,
  FlashGroupAControlMode: data?.FlashGroupAControlMode,
  FlashGroupBControlMode: data?.FlashGroupBControlMode,
  FlashGroupCControlMode: data?.FlashGroupCControlMode,
  FlashIlluminationPattern: data?.FlashIlluminationPattern,
  FlashGroupACompensation: data?.FlashGroupACompensation,
  FlashGroupBCompensation: data?.FlashGroupBCompensation,
  FlashGroupCCompensation: data?.FlashGroupCCompensation,
  VariProgram: data?.VariProgram,
  MultiExposureVersion: data?.MultiExposureVersion,
  MultiExposureMode: data?.MultiExposureMode,
  MultiExposureShots: data?.MultiExposureShots,
  MultiExposureOverlayMode: data?.MultiExposureOverlayMode,
  HighISONoiseReduction: data?.HighISONoiseReduction,
  PowerUpTime: data?.PowerUpTime ? ExifDateTime.fromJSON(data?.PowerUpTime) : undefined,
  AFInfo2Version: data?.AFInfo2Version,
  ContrastDetectAF: data?.ContrastDetectAF,
  AFAreaMode: data?.AFAreaMode,
  PhaseDetectAF: data?.PhaseDetectAF,
  PrimaryAFPoint: data?.PrimaryAFPoint,
  AFPointsUsed: data?.AFPointsUsed,
  FileInfoVersion: data?.FileInfoVersion,
  MemoryCardNumber: data?.MemoryCardNumber,
  DirectoryNumber: data?.DirectoryNumber,
  FileNumber: data?.FileNumber,
  AFFineTune: data?.AFFineTune,
  AFFineTuneIndex: data?.AFFineTuneIndex,
  AFFineTuneAdj: data?.AFFineTuneAdj,
  AFFineTuneAdjTele: data?.AFFineTuneAdjTele,
  RetouchInfoVersion: data?.RetouchInfoVersion,
  RetouchNEFProcessing: data?.RetouchNEFProcessing,
  SilentPhotography: data?.SilentPhotography,
  UserComment: data?.UserComment,
  SubSecTime: data?.SubSecTime,
  SubSecTimeOriginal: data?.SubSecTimeOriginal,
  SubSecTimeDigitized: data?.SubSecTimeDigitized,
  SensingMethod: data?.SensingMethod,
  FileSource: data?.FileSource,
  SceneType: data?.SceneType,
  CustomRendered: data?.CustomRendered,
  ExposureMode: data?.ExposureMode,
  FocalLengthIn35mmFormat: data?.FocalLengthIn35mmFormat,
  SceneCaptureType: data?.SceneCaptureType,
  GainControl: data?.GainControl,
  Contrast: data?.Contrast,
  Saturation: data?.Saturation,
  Sharpness: data?.Sharpness,
  SubjectDistanceRange: data?.SubjectDistanceRange,
  SerialNumber: data?.SerialNumber,
  LensInfo: data?.LensInfo,
  LensMake: data?.LensMake,
  LensModel: data?.LensModel,
  LensSerialNumber: data?.LensSerialNumber,
  CompositeImage: data?.CompositeImage,
  GPSVersionID: data?.GPSVersionID,
  GPSLatitudeRef: data?.GPSLatitudeRef,
  GPSLongitudeRef: data?.GPSLongitudeRef,
  GPSAltitudeRef: data?.GPSAltitudeRef,
  // GPSTimeStamp: data?.GPSTimeStamp ? parseGPSTimeStamp(data?.GPSTimeStamp) : undefined,
  GPSSatellites: data?.GPSSatellites,
  GPSMapDatum: data?.GPSMapDatum,
  // GPSDateStamp: data?.GPSDateStamp ? parseGPSDateStamp(data?.GPSDateStamp) : undefined,
  DateTimeOriginal: data?.DateTimeOriginal ? ExifDateTime.fromJSON(data?.DateTimeOriginal) : undefined,
  TIFF_EPStandardID: data?.TIFF_EPStandardID,
  Aperture: data?.Aperture,
  BlueBalance: data?.BlueBalance,
  CFAPattern: data?.CFAPattern,
  ImageSize: data?.ImageSize,
  // JpgFromRaw: data?.JpgFromRaw ? parseBinaryField(data?.JpgFromRaw) : undefined,
  Megapixels: data?.Megapixels,
  // OtherImage: data?.OtherImage ? parseBinaryField(data?.OtherImage) : undefined,
  // PreviewImage: data?.PreviewImage ? parseBinaryField(data?.PreviewImage) : undefined,
  RedBalance: data?.RedBalance,
  ScaleFactor35efl: data?.ScaleFactor35efl,
  ShutterSpeed: data?.ShutterSpeed,
  SubSecCreateDate: data?.SubSecCreateDate ? ExifDateTime.fromJSON(data?.SubSecCreateDate) : undefined,
  SubSecDateTimeOriginal: data?.SubSecDateTimeOriginal
    ? ExifDateTime.fromJSON(data?.SubSecDateTimeOriginal)
    : undefined,
  SubSecModifyDate: data?.SubSecModifyDate ? ExifDateTime.fromJSON(data?.SubSecModifyDate) : undefined,
  // ThumbnailImage: data?.ThumbnailImage ? parseBinaryField(data?.ThumbnailImage) : undefined,
  // PreviewTIFF: data?.PreviewTIFF ? parseBinaryField(data?.PreviewTIFF) : undefined,
  // ThumbnailTIFF: data?.ThumbnailTIFF ? parseBinaryField(data?.ThumbnailTIFF) : undefined,
  GPSDateTime: data?.GPSDateTime ? ExifDateTime.fromJSON(data?.GPSDateTime) : undefined,
  AutoFocus: data?.AutoFocus,
  LensSpec: data?.LensSpec,
  CircleOfConfusion: data?.CircleOfConfusion,
  DOF: data?.DOF,
  FOV: data?.FOV,
  FocalLength35efl: data?.FocalLength35efl,
  HyperfocalDistance: data?.HyperfocalDistance,
  LensID: data?.LensID,
  LightValue: data?.LightValue,
  warnings: data?.warnings,
});

export const parseImageResponse = (data: any): Image[] => {
  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    path: item.path,
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at),
    metadata: item.metadata ? parseMetadata(JSON.parse(item.metadata)) : undefined,
  }));
};
