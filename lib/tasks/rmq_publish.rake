require 'bunny'

namespace :rmq do
  task :publish do
    redis = Redis.new(host: "localhost", port: 6379, db: 15, password: "redis")
    conn = Bunny.new(:host => "localhost")
    conn.start
    ch = conn.create_channel

    q  = ch.queue("rpc_queue",{:auto_delete => false, durable: true, exclusive: false})
    x  = ch.default_exchange
    (1..10).each do |i|
      redis.set(i, JSON.generate({
          "file": "HelloWorld.java",
          "content": "public class HelloWorld { public static void main(String[] args){System.out.println(\"Hello, World Java\");}}",
          "language": "java"
      }))
      x.publish(JSON.generate({jobId: i}), :routing_key => q.name)
    end
    # close the connection
    conn.stop
  end
end
