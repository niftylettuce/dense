$(document).ready(function ()
{
    $('.ratio').text($(window).dense('devicePixelRatio'));

    var docs = $('#docs');

    var renderParams = function (parameters)
    {
        var out = [];

        $.each(parameters, function (key, param)
        {
            out.push(
                (param.optional ? '[' : '') +
                    param.type + ' ' + param.name + (param.default ? '=' + param.default : '') +
                (param.optional ? ']' : '')
            );
        });

        return out.join(', ');
    };

    $.ajax({
        url : '/docs/docs.json'
    })
        .done(function (data, textStatus, jqXHR)
        {
            var basename = data.classes[0].name + '.' + data.classes[0].classes[0].name + '.' +
                data.classes[0].classes[0].classes[0].name, 
                constructor = data.classes[0].classes[0].classes[0].constructor;

            docs.append($('<p />').text(constructor.description));
            docs.append(
                    $('<pre class="language-javascript" />')
                        .html($('<code />')
                        .text(
                            basename + '(' + renderParams(constructor.parameters) + ')'
                        
                        )));

            $.each(data.classes[0].classes[0].classes[0].functions, function (key, value)
            {
                docs.append($('<h2 />').text(value.name));
            });

            //alert(data.classes[0].classes[0].classes[0].name);
        });
});