console.log('Itee.Database.ElasticSearch v1.0.3 - CommonJs')
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ElasticSearchDriver = require('elasticsearch');
var iteeDatabase = require('itee-database');

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			}
		});
	}
	n['default'] = e;
	return Object.freeze(n);
}

var ElasticSearchDriver__namespace = /*#__PURE__*/_interopNamespace(ElasticSearchDriver);

/**
 * @author [Ahmed DCHAR]{@link https://github.com/dragoneel}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

class TElasticSearchDatabase extends iteeDatabase.TAbstractDatabase {

    constructor ( parameters = {} ) {

        const _parameters = {
            ...{},
            ...parameters,
            ...{
                driver: ElasticSearchDriver__namespace
            }
        };

        super( _parameters );

    }

    close ( /*onCloseCallback*/ ) {}

    connect () {

        var client = this._driver.Client( {
            host: 'localhost:9200'
        } );

        client.search( {
            index: 'books',
            type:  'book',
            body:  {
                query: {
                    multi_match: {
                        query:  'express js',
                        fields: [ 'title', 'description' ]
                    }
                }
            }
        } ).then( function ( response ) {
            var hits = response.hits.hits;
            this.logger.log( hits );
        }, function ( error ) {
            this.logger.trace( error.message );
        } );

    }

    init () {
        super.init();

    }

    on ( /*eventName, callback*/ ) {}
}

exports.TElasticSearchDatabase = TElasticSearchDatabase;
//# sourceMappingURL=itee-elasticsearch.cjs.js.map
