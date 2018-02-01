'use strict';

const ZIError = require('@zerointermittency/error');

class JWPlayerError extends ZIError {

    constructor(opts) {
        opts.prefix = 'zi-jwplayer';
        super(opts);
    }

}

module.exports = {
    internal: (extra) => new JWPlayerError({
        code: 100,
        name: 'internal',
        message: 'Internal error',
        level: ZIError.level.fatal,
        extra: extra,
    }),
    JWPlatformInvalidJSON: (message) => new JWPlayerError({
        code: 101,
        name: 'JWPlatformInvalidJSON',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformTimeout: (message) => new JWPlayerError({
        code: 102,
        name: 'JWPlatformTimeout',
        message: message,
        level: ZIError.level.fatal,
    }),
    // Errors defined for:
    // https://developer.jwplayer.com/jw-platform/reference/v1/errors.html
    // https://github.com/jwplayer/jwplatform-py/blob/master/jwplatform/errors.py
    JWPlatformUnknownError: (message) => new JWPlayerError({
        code: 103,
        name: 'JWPlatformUnknownError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformNotFoundError: (message) => new JWPlayerError({
        code: 104,
        name: 'JWPlatformNotFoundError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformNoMethodError: (message) => new JWPlayerError({
        code: 105,
        name: 'JWPlatformNoMethodError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformNotImplementedError: (message) => new JWPlayerError({
        code: 106,
        name: 'JWPlatformNotImplementedError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformNotSupportedError: (message) => new JWPlayerError({
        code: 107,
        name: 'JWPlatformNotSupportedError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformCallFailedError: (message) => new JWPlayerError({
        code: 108,
        name: 'JWPlatformCallFailedError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformCallUnavailableError: (message) => new JWPlayerError({
        code: 109,
        name: 'JWPlatformCallUnavailableError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformCallInvalidError: (message) => new JWPlayerError({
        code: 110,
        name: 'JWPlatformCallInvalidError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformParameterMissingError: (message) => new JWPlayerError({
        code: 111,
        name: 'JWPlatformParameterMissingError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformParameterEmptyError: (message) => new JWPlayerError({
        code: 112,
        name: 'JWPlatformParameterEmptyError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformParameterTypeEmptyError: (message) => new JWPlayerError({
        code: 113,
        name: 'JWPlatformParameterEmptyError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformAPIParameterEncodingError: (message) => new JWPlayerError({
        code: 114,
        name: 'JWPlatformAPIParameterEncodingError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformParameterEncodingError: (message) => new JWPlayerError({
        code: 115,
        name: 'JWPlatformAPIParameterEncodingError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformParameterInvalidError: (message) => new JWPlayerError({
        code: 116,
        name: 'JWPlatformParameterInvalidError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformPreconditionFailedError: (message) => new JWPlayerError({
        code: 117,
        name: 'JWPlatformPreconditionFailedError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformItemAlreadyExistsError: (message) => new JWPlayerError({
        code: 118,
        name: 'JWPlatformItemAlreadyExistsError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformPermissionDeniedError: (message) => new JWPlayerError({
        code: 119,
        name: 'JWPlatformPermissionDeniedError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformDatabaseError: (message) => new JWPlayerError({
        code: 120,
        name: 'JWPlatformDatabaseError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformIntegrityError: (message) => new JWPlayerError({
        code: 121,
        name: 'JWPlatformIntegrityError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformDigestMissingError: (message) => new JWPlayerError({
        code: 122,
        name: 'JWPlatformDigestMissingError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformDigestInvalidError: (message) => new JWPlayerError({
        code: 123,
        name: 'JWPlatformDigestInvalidError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformFileUploadFailedError: (message) => new JWPlayerError({
        code: 124,
        name: 'JWPlatformFileUploadFailedError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformFileSizeMissingError: (message) => new JWPlayerError({
        code: 125,
        name: 'JWPlatformFileSizeMissingError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformFileSizeInvalidError: (message) => new JWPlayerError({
        code: 126,
        name: 'JWPlatformFileSizeInvalidError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformInternalError: (message) => new JWPlayerError({
        code: 127,
        name: 'JWPlatformInternalError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformApiKeyMissingError: (message) => new JWPlayerError({
        code: 128,
        name: 'JWPlatformApiKeyMissingError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformApiKeyInvalidError: (message) => new JWPlayerError({
        code: 129,
        name: 'JWPlatformApiKeyInvalidError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformTimestampMissingError: (message) => new JWPlayerError({
        code: 130,
        name: 'JWPlatformTimestampMissingError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformTimestampInvalidError: (message) => new JWPlayerError({
        code: 131,
        name: 'JWPlatformTimestampInvalidError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformTimestampExpiredError: (message) => new JWPlayerError({
        code: 132,
        name: 'JWPlatformTimestampExpiredError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformNonceMissingError: (message) => new JWPlayerError({
        code: 133,
        name: 'JWPlatformNonceMissingError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformNonceInvalidError: (message) => new JWPlayerError({
        code: 134,
        name: 'JWPlatformNonceInvalidError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformSignatureMissingError: (message) => new JWPlayerError({
        code: 135,
        name: 'JWPlatformSignatureMissingError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformSignatureInvalidError: (message) => new JWPlayerError({
        code: 136,
        name: 'JWPlatformSignatureInvalidError',
        message: message,
        level: ZIError.level.fatal,
    }),
    JWPlatformRateLimitExceededError: (message) => new JWPlayerError({
        code: 137,
        name: 'JWPlatformRateLimitExceededError',
        message: message,
        level: ZIError.level.fatal,
    }),
};