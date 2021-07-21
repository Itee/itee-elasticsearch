console.log('Itee.Database.ElasticSearch v1.0.3 - EsModule')
import * as ElasticSearchDriver from 'elasticsearch';
import { TAbstractDatabase } from 'itee-database';

/**
 * @author [Ahmed DCHAR]{@link https://github.com/dragoneel}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

class TElasticSearchDatabase extends TAbstractDatabase {

    constructor ( parameters = {} ) {

        const _parameters = {
            ...{},
            ...parameters,
            ...{
                driver: ElasticSearchDriver
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

export { TElasticSearchDatabase };
//# sourceMappingURL=itee-elasticsearch.esm.js.map
