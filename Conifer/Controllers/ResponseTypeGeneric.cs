using System;
namespace Conifer.Controllers;

public class ResponseType<T> : ResponseType
{
    public int? total_no_of_rows { get; set; }

    public T? response_data { get; set; }
}

